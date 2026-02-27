import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import { Mail, Phone, MapPin, Calendar, Award } from 'lucide-react'

export default function AboutPage() {
  const personalInfo = {
    name: '丁宇轩',
    title: '前端开发工程师（4年经验）',
    email: '2568328627@qq.com',
    phone: '15171513675',
    birthYear: '2000',
    education: '广西科技大学鹿山学院 · 软件工程专业（2018-2022）',
    bio: '性格外向，善于与团队成员沟通；团队意识强，喜欢与团队共克难题、共享成果；积极向上，喜欢学习新的知识；乐观开朗，遇到艰难的问题时不沮丧。',
  }

  const skills = {
    frontend: {
      category: '前端框架',
      items: ['React 18', 'React Native', 'Vue 全家桶', 'Next.js', 'HarmonyOS Next', 'Nest.js', 'Uniapp']
    },
    language: {
      category: '编程语言',
      items: ['TypeScript', 'JavaScript', 'Node.js', 'ArkTs', 'Python', 'Java']
    },
    state: {
      category: '状态管理',
      items: ['Pinia', 'Vuex', 'Redux-Toolkit']
    },
    build: {
      category: '构建工具',
      items: ['Webpack', 'Vite']
    },
    style: {
      category: '样式技术',
      items: ['Scss', 'Less', 'Tailwind CSS', 'CSS in JS']
    },
    ui: {
      category: 'UI 组件库',
      items: ['ArkUI', 'Ant-Design', 'Ant-Design-Vue', 'Element-ui', 'Echarts', 'Vant']
    }
  }

  const experiences = [
    {
      title: 'Web & 鸿蒙开发工程师 & 开发组长 & PM',
      company: 'CrossShellNext',
      period: '2025.01 - 至今',
      description: '前端负责人、项目收尾及交付阶段负责人、开源社区维护者',
      details: [
        '基于HarmonyOS三层架构，从0到1搭建HarmonyOS Next项目工程',
        '使用napi调用so库接口，实现终端配置功能及伪终端通信',
        '开发串口调试模块，实现标准的UART配置及命令行调试',
        '开发基于Xterm.js库的网页版shell命令框',
        '开发SFTP功能的终端文件可视化操作窗口'
      ]
    },
    {
      title: '开发组长（自研岗位）',
      company: '德科信息有限公司',
      period: '2024.05 - 2025.12',
      description: '统筹和安排组员日常工作，跟进工作进度，识别项目风险',
      details: [
        '担任开发组长和项目经理，维护团队氛围',
        '设计并实施git workflow流程规范',
        'HarmonyOS Next PC/2in1项目前端开发负责人',
        '负责新项目技术框架选型、工程基础架构搭建',
        '担任鸿蒙原生开发培训讲师'
      ]
    },
    {
      title: '前端开发工程师（自研）',
      company: '柳州倬佲科技有限公司',
      period: '2021.09 - 2024.02',
      description: '负责web和小程序项目的开发、联调、测试和维护',
      details: [
        '负责公司OA系统的基础功能迭代及部分功能重构',
        '根据产品开发框架编写各类通用组件',
        '修复测试人员提出的bug',
        '参与公司技术分享会'
      ]
    }
  ]

  const certificates = [
    '鸿蒙开发工程师高级认证',
    '鸿蒙原生开发培训讲师认证',
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            关于我
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {personalInfo.title}
          </p>
        </div>

        {/* 个人信息卡片 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass rounded-xl p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 头像 */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-6xl mx-auto">
                  👨‍💻
                </div>
              </div>

              {/* 信息 */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{personalInfo.name}</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {personalInfo.title}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>中国</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{personalInfo.birthYear}年出生</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">教育背景</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.education}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">个人特点</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 证书 */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-2">
            <Award className="w-6 h-6" />
            荣誉证书
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏆</span>
                  <span className="font-medium">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 技能 */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">技能专长</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skills).map(([key, skillGroup]) => (
              <div key={key} className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 工作经历 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 gradient-text">工作经历</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="glass rounded-xl p-6 relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl">
                    💼
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {exp.description}
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
