import { Github, Mail, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">关于我</h3>
            <p className="text-gray-600 dark:text-gray-400">
              前端开发工程师，专注于 Web 技术和鸿蒙开发。热爱开源，乐于分享技术经验。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  博客文章
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  项目展示
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  关于我
                </a>
              </li>
            </ul>
          </div>

          {/* 社交链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">社交媒体</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:2568328627@qq.com"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} 丁宇轩. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
