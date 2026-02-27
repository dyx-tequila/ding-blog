import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingShapes } from '@/components/floating-shapes'

export default function Home() {
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
            丁宇轩
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            前端开发工程师 · 鸿蒙开发者 · 技术探索者
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            专注于 Web 技术和鸿蒙生态，热爱开源，乐于分享
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <a
              href="/blog"
              className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              浏览博客
            </a>
            <a
              href="/projects"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              项目展示
            </a>
          </div>
        </div>
      </section>

      {/* 技能展示 */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React', level: 90 },
            { name: 'Vue', level: 85 },
            { name: 'HarmonyOS', level: 80 },
            { name: 'Node.js', level: 75 },
          ].map((skill) => (
            <div
              key={skill.name}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部 */}
      <Footer />
    </main>
  )
}
