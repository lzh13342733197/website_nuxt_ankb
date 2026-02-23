// 导入 SVG 图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 导入 Node.js 路径模块（用于拼接目录路径）
import path from 'node:path'
export default defineNuxtConfig({
  cssModules: {
    // 自定义模块化类名格式（可选，默认是 [hash:base64]）
    localsConvention: 'camelCase', // 支持 styles.cardPeekListWrapper 写法
    scopeBehaviour: 'local'
  },
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
        '@': path.resolve(process.cwd(), '.'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true // 开启 less 内联 JS
        }
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  server: {
    host: '0.0.0.0' // 允许通过本机IP访问
  },

  modules: ['@nuxtjs/i18n', '@nuxt/image', '@pinia/nuxt','pinia-plugin-persistedstate/nuxt'],
  plugins: [{
    src: 'plugins/lazyload.client.js',
  }, {
    src: 'plugins/element-plus.ts',
  }, {
    src: 'plugins/svg-icons.ts',
    mode: 'client'
  }],
  middleware: ['auth'],
  i18n: {
    defaultLocale: 'en',
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: './i18n/index.js',
    allowHtml: true,
    allowHtmlMessage: true,
    locales: [
      // { code: 'zh', name: 'Chinese', iso: 'zh-Hans', file: 'zh.js' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' }
    ],
    detectBrowserLanguage: {
      enabled: true, // 自动检测浏览器语言
      cookieKey: 'nuxt-i18n-lang' // 持久化到 cookie
    },
    langDir: 'locales/lang/'
  },
  alias: {
    '@/assets': './assets',
    '@': path.resolve(process.cwd(), '.'),
  },
  // 关键配置
  runtimeConfig: {
    // 服务端专用（不暴露给客户端）
    apiUrl: process.env.NUXT_API_URL,
    // 客户端可用的变量，必须放在public对象里
    public: {
      apiUrl: process.env.NUXT_API_URL
    }
  },

})