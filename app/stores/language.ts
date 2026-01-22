// ~/stores/language.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
// 适配 Nuxt 4：替换 vue-router 的 useRouter 为 Nuxt 内置 useRouter（自动导入，无需额外配置）
// import { useRouter } from 'vue-router' // 注释/删除原导入
import { useRouter } from '#app' // Nuxt 4 内置导入（也可省略，直接使用，自动注入）

// 适配 Nuxt 4：调整 i18n 导入（Nuxt 4 中国际化推荐使用 useI18n 组合式函数，而非直接导入 i18n 实例）
import { useI18n } from 'vue-i18n'

// 你的其他工具导入（保持不变，确保文件路径正确）

export const useLanguageStore = defineStore('language', () => {
  // ------------- 适配 Nuxt 4：获取 i18n 实例 -------------
  const { locale, setLocale } = useI18n()

  // 状态定义（保持不变）
  const language = ref('en')
  const requestList = ref<Function[]>([])

  // 重试请求方法（保持不变）
  const retryRequest = () => {
    for (const request of requestList.value) {
      request()
    }
  }

  // 切换语言方法（改造 i18n 调用方式，适配 Nuxt 4）
  const setLanguage = (newLanguage: string) => {
    // 替换原 i18n.global.locale.value = newLanguage
    locale.value = newLanguage // 直接使用 useI18n 获取的 locale 响应式变量
    // 或使用 setLocale 方法（更规范）：setLocale(newLanguage)
    language.value = newLanguage
    retryRequest()
  }

  // 添加请求到队列方法（保持不变）
  const addRequest = (request: Function) => {
    requestList.value.push(request)
  }

  // 监听 language 变化，自动重试请求（保持不变）
  watch(language, () => {
    retryRequest()
  })

  // 暴露状态和方法（保持不变）
  return {
    language,
    setLanguage,
    addRequest,
  }
})