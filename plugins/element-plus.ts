// plugins/element-plus.client.ts
import { defineNuxtPlugin } from '#app'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY
} from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus)

  // ✅ SSR hydration 必须
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: 0,
    current: 0
  })

  nuxtApp.vueApp.provide(ZINDEX_INJECTION_KEY, {
    current: 2000
  })
})
