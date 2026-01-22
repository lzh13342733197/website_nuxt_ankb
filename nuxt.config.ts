
// 导入 SVG 图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 导入 Node.js 路径模块（用于拼接目录路径）
import path from 'path'

export default defineNuxtConfig({
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 关键修改：路径指向 app/assets/icons/
        iconDirs: [path.resolve(process.cwd(), 'app/assets/icons')],
        // SVG 符号 ID 格式（保持不变，按需调整）
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.')
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  server: {
    host: '0.0.0.0' // 允许通过本机IP访问
  },

  modules: ['@nuxtjs/i18n'],
  plugins: [{
    src: 'plugins/lazyload.client.ts',
    ssr: false
  }, {
    src: 'plugins/element-plus.client.ts',
    mode: 'client'
  }, {
    src: 'plugins/svg-icons.ts',
    mode: 'client'
  }],
  middleware: ['auth'],
  i18n: {
    defaultLocale: 'zh',
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    // strategy:'no_prefix',
    vueI18n: './i18n/index.js',
    allowHtml: true,
    allowHtmlMessage: true,
    locales: [
      { code: 'zh', name: '中文', file: 'zh.js' },
      { code: 'en', name: 'English', file: 'en.js' }
    ],

    // ✅ 注意：这里不写 app/
    langDir: 'locales/lang/'
  },
  alias: {
    '@/assets': './assets'
  },
  // 关键配置
  runtimeConfig: {
    // 服务端专用（不暴露给客户端）
    apiUrl: process.env.NUXT_API_URL,
    // 客户端可用的变量，必须放在public对象里
    public: {
      apiUrl: process.env.NUXT_API_URL
    }
  }
})