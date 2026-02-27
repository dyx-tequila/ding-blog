import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectsPage() {
  const projects = [
    {
      id: '1',
      title: 'CrossShellNext',
      description: '基于 OpenHarmony 平台的多协议终端客户端应用，提供 SSH、Telnet 和串口连接功能',
      techStack: ['HarmonyOS Next', 'ArkTS', 'NDK', 'Xterm.js'],
      demoUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      featured: true,
    },
    {
      id: '2',
      title: '德科信息企业官网',
      description: '使用 Next.js 重构的企业级官网，支持 SSR、CSR 和 ISR',
      techStack: ['Next.js', 'React18', 'TypeScript', 'Redux-Toolkit'],
      demoUrl: 'https://dekeinfo.com',
      repoUrl: 'https://github.com',
      featured: true,
    },
    {
      id: '3',
      title: '员工培训系统（LMS）',
      description: '运行在 PC 端的内部员工培训系统，支持视频培训、考试等功能',
      techStack: ['Vue3', 'TypeScript', 'ECharts', 'Video.js'],
      demoUrl: null,
      repoUrl: 'https://github.com',
      featured: false,
    },
    {
      id: '4',
      title: '渔业授信养殖金融服务平台',
      description: '渔业生产管理和金融管理的 SaaS 系统',
      techStack: ['Vue3', 'Vite', 'TypeScript', 'ECharts'],
      demoUrl: null,
      repoUrl: 'https://github.com',
      featured: false,
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
            项目展示
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            我参与开发的一些项目
          </p>
        </div>

        {/* 推荐项目 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>⭐</span> 推荐项目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <div
                  key={project.id}
                  className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                    {project.featured && (
                      <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-600 rounded-full">
                        精选
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        在线演示
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <Github className="w-4 h-4" />
                        源码
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 全部项目 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">全部项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      演示
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
