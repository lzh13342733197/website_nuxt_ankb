// plugins/lazyload.client.js (后缀 .client.js 表示仅客户端执行，无需再配 mode: 'client')
import VueLazyload from "vue-lazyload";

// Nuxt 3 推荐的插件封装方式：defineNuxtPlugin
export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp 是 Nuxt 3 中 Vue 应用实例的正确获取方式
  nuxtApp.vueApp.use(VueLazyload, {
    preLoad: 1.33, // 预加载的宽高比例
    loading: "/loading-placeholder-gray.jpg", // 注意：Nuxt 3 中配置项是 loading 而非 loadingImg
    error: "/error-placeholder.webp", // 注意：Nuxt 3 中配置项是 error 而非 errorImg
    attempt: 2, // 尝试加载次数
    throttleWait: 500, // 节流等待时间
  });
});