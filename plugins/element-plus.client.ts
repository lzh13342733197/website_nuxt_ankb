import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  const app = createApp({}) // 使用 createApp 创建一个 Vue 应用实例（仅用于 Element Plus 的初始化）
  app.use(ElementPlus) // 全局注册 Element Plus 组件
})
