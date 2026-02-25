<template>
    <SwiperModule :images="swiperList" class="swiperModule_" />
    <SocialMediaVideo style="margin: 0 auto" />
    <ProductShowcase :products="templateData" />
    <PatentsAwards />
    <Patent_home />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useFetchWithLanguageWithLocale } from '~/utils/useFetchWithLanguage'
import SwiperModule from '~/components/home/SwiperModule.vue'
import SocialMediaVideo from '~/components/home/SocialMediaVideo.vue'
import ProductShowcase from '~/components/home/ProductShowcase.vue'
import PatentsAwards from '~/components/home/PatentsAwards.vue'
import Patent_home from '~/components/home/Patent_home.vue'
import { useRoute } from 'vue-router'

import { useRuntimeConfig } from '#app'
import axios from 'axios'
// 获取运行时配置
import { useI18n } from 'vue-i18n'
onMounted(async () => {
    if (window.innerWidth < 768) {
     deviceType.value = 'mobile'
     getswiperList()
    }

})
const { locale } = useI18n() // 当前语言



// key 包含当前语言
const { data: templateData } = useAsyncData(
    () => `templateData-${locale.value}`, // 每种语言独立缓存
    async () => {
        // 每次请求动态传入当前语言
        console.log('当前语言:', locale.value)
        const fetchWithLocale = useFetchWithLanguageWithLocale(locale.value)

        try {
            const response = await fetchWithLocale.post(
                `/product/show`,
            )
            return response.data
        } catch (err) {
            console.warn('获取模板数据失败:', err)
            return []
        }
    },
    {
        watch: () => locale.value // 监听语言变化自动刷新
    }
)
// 简化设备类型判断，服务端默认使用'mobile'
const deviceType = ref('pc')

const { data: swiperList } = useAsyncData('bannerData', async () => {
    try {

        const response = await axios.post(`https://www.ankbit.com:8080/api/banner/list`, { type: deviceType.value }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('API响应:', 'banner/list')

        // 处理响应数据
        const processedData = response.data.data.map((item) => ({
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

const getswiperList = async () => {
    const response = await axios.post(`https://www.ankbit.com:8080/api/banner/list`, { type: deviceType.value }, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    swiperList.value = response.data.data.map((item) => ({
        src: item.imageUrl,
        url: item.linkUrl,
        alt: item.title,
        ...item
    }))
}
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