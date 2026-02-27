import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import Link from 'next/link'
import { Calendar, Eye, Tag } from 'lucide-react'

export default function BlogPage() {
  // 示例文章数据（后续可以从后端 API 获取）
  const posts = [
    {
      id: '1',
      title: 'Next.js 14 App Router 完全指南',
      excerpt: '深入了解 Next.js 14 的 App Router 特性，包括服务端组件、路由、数据获取等核心概念。本文将带你从零开始构建一个现代化的 Next.js 应用。',
      coverImage: null,
      createdAt: '2024-01-15',
      category: { name: '前端开发', slug: 'frontend' },
      tags: ['Next.js', 'React', 'SSR'],
      viewCount: 1234,
      readTime: 8,
    },
    {
      id: '2',
      title: 'HarmonyOS Next 开发实战经验分享',
      excerpt: '分享在 HarmonyOS Next 开发过程中的经验总结，包括 ArkTS 语言、UI 组件、NAPI 调用等核心技术点，以及从 0 到 1 构建应用的完整流程。',
      coverImage: null,
      createdAt: '2024-01-10',
      category: { name: '鸿蒙开发', slug: 'harmonyos' },
      tags: ['HarmonyOS', 'ArkTS', 'NAPI'],
      viewCount: 856,
      readTime: 12,
    },
    {
      id: '3',
      title: 'TypeScript 高级类型系统实战',
      excerpt: '深入探讨 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等，并通过实际案例展示如何构建类型安全的应用程序。',
      coverImage: null,
      createdAt: '2024-01-05',
      category: { name: 'TypeScript', slug: 'typescript' },
      tags: ['TypeScript', '类型系统', '前端'],
      viewCount: 967,
      readTime: 10,
    },
    {
      id: '4',
      title: 'React 18 新特性深度解析',
      excerpt: '全面解析 React 18 的新特性，包括并发渲染、自动批处理、Suspense 改进等，以及如何在项目中最佳实践这些新特性。',
      coverImage: null,
      createdAt: '2023-12-28',
      category: { name: 'React', slug: 'react' },
      tags: ['React', 'Concurrent', '前端'],
      viewCount: 1543,
      readTime: 15,
    },
  ]

  const categories = [
    { name: '全部', slug: 'all', count: posts.length },
    { name: '前端开发', slug: 'frontend', count: 2 },
    { name: '鸿蒙开发', slug: 'harmonyos', count: 1 },
    { name: 'TypeScript', slug: 'typescript', count: 1 },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            技术博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            分享技术经验，记录学习历程
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className="px-4 py-2 rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="glass rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                  {post.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-primary rounded-full shadow-lg">
                        {post.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{post.createdAt}</span>
                    <span>·</span>
                    <span>{post.readTime} 分钟阅读</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{post.viewCount}</span>
                    </div>
                    <span className="text-primary font-medium group-hover:underline">
                      阅读更多 →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
            加载更多文章
          </button>
        </div>

        {/* 订阅提示 */}
        <div className="mt-16 glass rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 gradient-text">订阅我的博客</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            获取最新的技术文章和项目动态，每周更新一次
          </p>
          <div className="flex gap-3 justify-center">
            <input
              type="email"
              placeholder="你的邮箱地址"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              订阅
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
