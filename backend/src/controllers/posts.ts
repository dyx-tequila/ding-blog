import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

// 获取文章列表
export const getPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      status = 'published',
      sortBy = 'publishedAt',
      order = 'desc',
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      status,
    };

    if (category) {
      where.category = { slug: category };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: { slug: tag },
        },
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
          [sortBy as string]: order,
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取推荐文章
export const getFeaturedPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'published',
        isFeatured: true,
      },
      take: 5,
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
      },
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// 根据 slug 获取文章
export const getPostBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          where: {
            status: 'approved',
            parentId: null,
          },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    avatar: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!post) {
      throw new AppError('文章不存在', 404);
    }

    // 增加浏览量
    await prisma.post.update({
      where: { id: post.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// 根据 ID 获取文章
export const getPostById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      throw new AppError('文章不存在', 404);
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// 创建文章
export const createPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, slug, content, excerpt, coverImage, categoryId, tags, isFeatured } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        categoryId,
        isFeatured,
        authorId: req.user!.id,
        status: 'published',
        publishedAt: new Date(),
        tags: tags
          ? {
              create: tags.map((tagId: string) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: '文章创建成功',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// 更新文章
export const updatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, coverImage, categoryId, tags, isFeatured, status } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(categoryId !== undefined && { categoryId }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(status && { status }),
        ...(status === 'published' && !req.body.publishedAt && { publishedAt: new Date() }),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: '文章更新成功',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// 删除文章
export const deletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: '文章删除成功',
    });
  } catch (error) {
    next(error);
  }
};

// 搜索文章
export const searchPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      throw new AppError('请提供搜索关键词', 400);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await prisma.post.findMany({
      where: {
        status: 'published',
        OR: [
          { title: { contains: q as string } },
          { content: { contains: q as string } },
          { excerpt: { contains: q as string } },
        ],
      },
      skip,
      take: Number(limit),
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
      },
    });

    const total = await prisma.post.count({
      where: {
        status: 'published',
        OR: [
          { title: { contains: q as string } },
          { content: { contains: q as string } },
          { excerpt: { contains: q as string } },
        ],
      },
    });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
