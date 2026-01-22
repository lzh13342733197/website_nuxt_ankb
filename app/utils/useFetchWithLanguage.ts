// 定义 API 响应数据类型（提升 TS 类型提示，非必须但推荐）
interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}

// 导入项目依赖（你的已有模块）

// import { useLanguageStore } from '@/stores/language'
// /Users/oliverliao/Desktop/gitClone/newNuxt/my-nuxt-app/i18n/locales/index.js


// SSG服务端环境下的模拟数据生成函数
const getMockData = (url: string) => {
  // 根据不同接口返回对应结构的模拟数据
  if (url.includes('product')) {
    return { code: 1, data: [] }
  }
  if (url.includes('detail')) {
    return { code: 1, data: {} }
  }
  return { code: 1, data: null }
}

// 核心请求函数
const _request = async <T = any>(
  url: string,
  method: 'post' | 'get',
  params?: Record<string, any>
): Promise<T | null | false> => {
  try {
    // 服务端也发送真实请求，而不是返回模拟数据
    // if (process.server) {
    //   const mockData = getMockData(url)
    //   if (mockData.code === 1) {
    //     return mockData.data as T
    //   } else {
    //     throw new Error('Mock request failed')
    //   }
    // }
    

    // 获取 Nuxt 全局运行时配置（用于拼接基准 URL）
    const runtimeConfig = useRuntimeConfig()
    const baseApiUrl = runtimeConfig.public.apiUrl || ''
    const fullUrl = `${baseApiUrl}${url}`

    // 构造请求配置
    const requestOptions = {
      method: method,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
      },
      // 根据请求方式传递参数
      ...(method === 'post' && params ? { body: JSON.stringify(params) } : {}),
      ...(method === 'get' && params ? { query: params } : {})
    }

    // Nuxt 4 内置 useFetch（无需手动导入，自动注入）
    const { data, error } = await useFetch<ApiResponse<T>>(fullUrl, requestOptions)

    // 处理请求错误
    if (error.value) {
      console.warn(`[${method.toUpperCase()}] ${url} network error:`, error.value)
      return method === 'get' ? null : false
    }

    // 处理空响应 - 不抛出错误，返回默认值
    if (!data.value) {
      console.warn(`[${method.toUpperCase()}] ${url} returned empty response`)
      return method === 'get' ? null : false
    }

    // 处理服务端业务码
    if (data.value.code === 1) {
      return data.value.data
    } else {
      console.warn(`[${method.toUpperCase()}] ${url} server error:`, data.value.message)
      return method === 'get' ? null : false
    }
  } catch (error) {
    console.warn(`[${method.toUpperCase()}] ${url} failed:`, error)
    // 返回安全默认值，避免后续报错
    return method === 'get' ? null : false
  }
}

// 对外暴露的请求方法
export const useFetchWithLanguage = {
  post: async <T = any>(url: string, params: Record<string, any>) => {
    return await _request<T>(url, 'post', params)
  },
  get: async <T = any>(url: string, params?: Record<string, any>) => {
    return await _request<T>(url, 'get', params)
  },
}