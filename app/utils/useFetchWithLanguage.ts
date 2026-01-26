// 定义 API 响应数据类型（提升 TS 类型提示，非必须但推荐）
interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}
// import { useLanguageStore } from '@/stores/language'
// 核心请求函数
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const _request = async <T = any>(
  url: string,
  method: 'post' | 'get',
  params?: Record<string, any>,
): Promise<T | null | false> => {
  try {
     const route = useRoute()
    const runtimeConfig = useRuntimeConfig()
    const fullUrl = `${runtimeConfig.public.apiUrl}${url}`
    const lang = route.path.split('/')[1] || 'en'
    console.log('lang===================>', lang  ,route.path)
    const { data, error } = await useFetch<ApiResponse<T>>(fullUrl, {
      method,
      headers: {
        'Accept-Language': lang,
        'Content-Type': 'application/json',
      },
      ...(method === 'post' && params ? { body: JSON.stringify(params) } : {}),
      ...(method === 'get' && params ? { query: params } : {})
    })

    if (error.value || !data.value || data.value.code !== 1) {
      return method === 'get' ? null : false
    }

    return data.value.data
  } catch {
    return method === 'get' ? null : false
  }
}

export const useFetchWithLanguageWithLocale = (localeValue: string) => {
  return {
    post: (url: string, data: any = {}, options: any = {}) => {
      return $fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Accept-Language': localeValue,
          ...(options.headers || {})
        }
      })
    },
    get: (url: string, options: any = {}) => {
      return $fetch(url, {
        method: 'GET',
        headers: {
          'Accept-Language': localeValue,
          ...(options.headers || {})
        }
      })
    }
  }
}


// 对外暴露的请求方法
export const useFetchWithLanguage = {
  get<T>(url: string, params?: Record<string, any>) {
    return _request<T>(url, 'get', params)
  },
  post<T>(url: string, params: Record<string, any>) {
    return _request<T>(url, 'post', params)
  }
}
