import { defineNuxtPlugin } from '#app'
import VueLazyload from 'vue3-lazyload'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.vueApp.use(VueLazyload, {
      ssr: false,  // 【关键新增】禁用插件的 SSR 支持，避免服务端解析指令
      loading: '/loading-placeholder-gray.jpg',
      error: '/error-placeholder.webp',
      attempt: 3,
      throttleWait: 300,
      observer: true,
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    })
  }
})