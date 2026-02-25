<template>
  <div class="layout-root">
    <!-- 顶部导航，只在客户端渲染 -->
      <NavigationBarPC class="NavigationBarPC" @jumpToCategory="handleJumpToCategory" />
    <!-- 页面内容 -->
    <div>
      <NuxtPage />
      <client-only>
        <Footer />
      </client-only>
    </div>

  </div>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

// 首页跳转分类全局状态
const targetCategoryId = useState('targetCategoryId', () => null)

onMounted(() => {
 if (route.path === ``) {
     router.push('/home')
     nextTick()
  }
})

// 顶部导航触发跳转
const handleJumpToCategory = async (id) => {
  targetCategoryId.value = id
  if (route.path !== '/home') {
    await router.push('/home')
    await nextTick()
  }
}
</script>

<style scoped>
.layout-root {
  width: 100%;
}

.content-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}
</style>

<style>
:deep(.el-popup-parent--hidden) {
  width: 100%;
}
body {
  margin: 0;
}
</style>
