import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import Link from 'next/link'

export default function BlogPage() {
  // 示例数据，后续从 API 获取
  const posts = [
    {
      id: '1',
      title: 'Next.js 14 App Router 完全指南',
      excerpt: '深入了解 Next.js 14 的 App Router 特性，包括服务端组件、路由、数据获取等核心概念。',
      coverImage: '/images/blog-1.jpg',
      createdAt: '2024-01-15',
      category: { name: '前端开发', slug: 'frontend' },
      tags: [{ name: 'Next.js' }, { name: 'React' }],
      viewCount: 1234,
    },
    {
      id: '2',
      title: 'HarmonyOS Next 开发实战',
      excerpt: '分享在 HarmonyOS Next 开发过程中的经验总结，包括 ArkTS 语言、UI 组件等。',
      coverImage: '/images/blog-2.jpg',
      createdAt: '2024-01-10',
      category: { name: '鸿蒙开发', slug: 'harmonyos' },
      tags: [{ name: 'HarmonyOS' }, { name: 'ArkTS' }],
      viewCount: 856,
    },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            博客文章
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            分享技术经验，记录学习历程
          </p>
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
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {post.category.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.createdAt}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      👁 {post.viewCount}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
            加载更多
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
