<template>
    <SwiperModule :images="swiperList" class="swiperModule_" />
    <SocialMediaVideo style="margin: 0 auto" />
    <ClientOnly>
    <ProductShowcase :products="templateData"  v-if="templateData.length" />
    <PatentsAwards />
    </ClientOnly>
    <Patent_home />

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFetchWithLanguage } from '~/utils/useFetchWithLanguage'
import SwiperModule from '~/components/home/SwiperModule.vue'
import SocialMediaVideo from '~/components/home/SocialMediaVideo.vue'
import ProductShowcase from '~/components/home/ProductShowcase.vue'
import PatentsAwards from '~/components/home/PatentsAwards.vue'
import Patent_home from '~/components/home/Patent_home.vue'


import { useRuntimeConfig } from '#app'

// 获取运行时配置
const config = useRuntimeConfig()
const loading = ref(true)
const swiperList = ref([])


onMounted(async () => {

})
const { data: templateData } =  useAsyncData('templateData', async () => {
    try {
        const response = await useFetchWithLanguage.post(`/product/show`)
        // console.log('API响应:', response)
        
        return response
    } catch (err) {
        console.warn('获取模板数据失败:', err)
        return [] // 返回空数组作为回退
    }
})

// 简化设备类型判断，服务端默认使用'mobile'
const getDeviceType = () => {
  // 在Nuxt中应该使用 process.client 检测客户端环境
  if (import.meta.client && window.innerWidth > 768) {
    return 'pc'
  } else if (import.meta.server) {
    return 'pc'
  }
  return 'mobile'
}

// 使用useAsyncData获取数据，确保服务端和客户端都能正确请求
const { data, error } =  useAsyncData('bannerData', async () => {
  try {
    const deviceType = getDeviceType()
    console.log('正在请求数据，设备类型:', deviceType)
    
    const response = await useFetchWithLanguage.post(`/banner/list`, { type: deviceType })
    // console.log('API响应:', response)
    
    // 处理响应数据
    const processedData = response.map((item) => ({
      src: item.imageUrl,
      url: item.linkUrl,
      alt: item.title,
      ...item
    }))
    
    return processedData
  } catch (err) {
    console.warn('获取轮播图数据失败:', err)
    return [] // 返回空数组作为回退
  }
})

// 直接使用data.value，不需要额外的watch
swiperList.value = data.value || []
loading.value = false



</script>



<style scoped>
.swiperModule_ {
    /* margin-bottom: 40px; */
}

.card-wrap-container {
    width: 100%;
}

@media (max-width: 1355px) {
    .card-wrap-container {
        flex-direction: column;
    }

    .leftOption {
        display: flex;
        justify-content: center;
    }
}

@media (min-width: 1355px) {
    .card-wrap-container {
        flex-direction: row;
    }
}
</style>