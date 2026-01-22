// ~/plugins/svg-icons.ts
import { defineNuxtPlugin } from '#app'
// 导入 SVG 图标注册脚本（核心逻辑不变）
import 'virtual:svg-icons-register'

// 按 Nuxt 插件规范默认导出插件函数
export default defineNuxtPlugin((nuxtApp) => {
  // 该插件仅需导入注册脚本，无需额外逻辑，函数体留空即可
  console.log('SVG icons plugin registered successfully') // 可选：验证插件加载
})