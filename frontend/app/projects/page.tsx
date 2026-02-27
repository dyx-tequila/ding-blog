import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import Link from 'next/link'
import { ExternalLink, Github, Star } from 'lucide-react'

export default function ProjectsPage() {
  const projects = [
    {
      id: '1',
      title: 'CrossShellNext',
      description: '基于 OpenHarmony 平台开发的多协议终端客户端应用，提供 SSH、Telnet 和串口连接功能',
      fullDescription: 'CrossShellNext 是一个基于 OpenHarmony 平台开发的多协议终端客户端应用，提供 SSH、Telnet 和串口连接功能。该应用支持远程命令行访问、文件传输（SFTP）、端口转发等高级功能，并提供了现代化的用户界面和丰富的用户体验。',
      techStack: ['HarmonyOS Next', 'ArkTS', 'NDK', 'Hybrid App', '跨端适配', '文件系统', '硬件通信'],
      demoUrl: null,
      repoUrl: 'https://github.com/dyx-tequila/CrossShellNext',
      featured: true,
      period: '2025.01 - 至今',
      role: '前端负责人 & 项目经理',
      achievements: [
        '从0到1搭建HarmonyOS Next项目工程',
        '使用napi调用so库接口实现终端通信',
        '开发基于Xterm.js的网页版shell',
        '开源社区维护者'
      ]
    },
    {
      id: '2',
      title: '德科信息企业官网',
      description: '使用 Next.js 重构的企业级官网并适配H5，用于展示公司的核心能力、业务范围、企业新闻等',
      fullDescription: '开发并重构了德科信息的企业级官网并适配H5，用于展示公司的核心能力、业务范围、企业新闻等；结合SSR、CSR和ISR优化页面加载；设计并封装了C端各页面的埋点功能。',
      techStack: ['Next.js', 'React18', 'TypeScript', 'Redux-Toolkit', 'Scss', 'Antd', 'Webpack', 'H5'],
      demoUrl: 'https://dekeinfo.com',
      repoUrl: null,
      featured: true,
      period: '2024.05 - 2025.12',
      role: '前端开发工程师',
      achievements: [
        '从0-1搭建Next.js框架重构项目',
        '结合SSR、CSR和ISR优化加载',
        '设计并封装埋点功能',
        '适配移动端和PC端'
      ]
    },
    {
      id: '3',
      title: '员工培训系统（LMS）',
      description: '一个运行在PC端的内部员工培训系统，主要实现对内部员工进行培训、考核、支持记录视频播放进度等功能',
      fullDescription: '一个运行在PC端的内部员工培训系统，主要实现对内部员工进行培训，考核，支持记录视频播放进度、配置视频播放时是否可操作、预览ppt和文档、填写考卷及查看题解等功能。',
      techStack: ['Vue3', 'TypeScript', 'Vite', 'ECharts', 'Less', 'Video.js', 'Adv组件库'],
      demoUrl: null,
      repoUrl: null,
      featured: false,
      period: '2023.01 - 2024.02',
      role: '前端开发工程师',
      achievements: [
        '搭建Vue3+TS+Vben前端框架',
        '使用ECharts开发培训数据图表',
        '二次开发Video.js自定义视频控件',
        '实现课程学习和考试功能'
      ]
    },
    {
      id: '4',
      title: '渔业授信养殖金融服务平台(银渔)',
      description: '一个运行在PC端的生产管理和金融管理的SaaS系统，主要实现渔业生产过程中各项指标、数据的监听和记录以及金融授信贷款服务等功能',
      fullDescription: '一个运行在PC端的生产管理和金融管理的SaaS系统，主要实现渔业生产过程中各项指标、数据的监听和记录以及金融授信贷款服务等功能。',
      techStack: ['Vue3', 'Vite', 'TypeScript', 'ECharts', 'Less'],
      demoUrl: null,
      repoUrl: null,
      featured: false,
      period: '2021.09 - 2022.12',
      role: '前端负责人',
      achievements: [
        'PC端前端负责人',
        '设计并开发多个功能模块',
        '对整个系统进行维护和迭代升级'
      ]
    },
    {
      id: '5',
      title: '米家',
      description: '基于React-Native的米家自研产品进行鸿蒙化适配，包括RN三方包适配和ArkTs原生开发',
      fullDescription: '米家项目是基于React-Native 0.61版本开发的，鸿蒙官方适配RN框架的最低版本为0.72，需将0.61版本适配0.72；使用RN开发的米家自研产品进行鸿蒙化RN三方包适配。',
      techStack: ['ArkTS', 'TypeScript', 'React-Native', 'NAPI'],
      demoUrl: null,
      repoUrl: null,
      featured: false,
      period: '2025.01 - 2025.08',
      role: '前端开发工程师',
      achievements: [
        '使用RN开发的米家产品进行鸿蒙化适配',
        '使用ArkTs原生开发米家首页',
        '协调华为进行NAPI接口桥接'
      ]
    }
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            精选项目
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
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {project.period}
                      </p>
                      <p className="text-primary font-medium mb-2">{project.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {project.description}
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 ml-2" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    {project.achievements?.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline text-sm"
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
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:underline text-sm"
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
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {project.period}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
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
                      className="text-primary hover:underline text-xs"
                    >
                      演示
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:underline text-xs"
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
