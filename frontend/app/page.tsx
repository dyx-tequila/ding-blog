import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'
import Link from 'next/link'

export default function Home() {
  // 你的真实信息
  const personalInfo = {
    name: '丁宇轩',
    title: '前端开发工程师 · 鸿蒙开发者 · 4年经验',
    description: '专注于 Web 技术和鸿蒙生态开发，热爱开源，乐于分享技术经验',
    email: '2568328627@qq.com',
    phone: '15171513675',
    location: '广西科技大学鹿山学院 · 软件工程专业 (2018-2022)',
  }

  const skills = [
    { name: 'React 18', level: 90 },
    { name: 'HarmonyOS Next', level: 80 },
    { name: 'Vue.js', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'ArkTS', level: 80 },
    { name: 'Nest.js', level: 70 },
  ]

  const quickLinks = [
    { href: '/blog', title: '浏览博客', emoji: '📝' },
    { href: '/projects', title: '项目展示', emoji: '💼' },
    { href: '/about', title: '关于我', emoji: '👨‍💻' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <FloatingShapes />
      
      {/* 导航栏 */}
      <Navbar />
      
      {/* Hero 区域 */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            {personalInfo.title}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {personalInfo.description}
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span className="text-2xl">{link.emoji}</span>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 技能展示 */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          技能专长
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <p className="text-right text-sm text-gray-500 mt-2">{skill.level}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* 快速信息 */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold mb-2">邮箱</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{personalInfo.email}</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">电话</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{personalInfo.phone}</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-semibold mb-2">教育</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{personalInfo.location}</p>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <Footer />
    </main>
  )
}
