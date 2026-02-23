<template>
  <div class="top_img">
    <img v-if="!isMobile" style="width: 100%" :src="factoryBannerPc" alt="">
    <img v-else style="width: 100%" :src="factoryBannerMobile" alt="">
  </div>
  <section class="factory-module">
    <!-- 模块标题 + 路由切换tab -->
    <div class="factory-header">
      <!-- <div class="factory-title">Our Factory</div> -->
      <div class="section-tab-wrapper">
        <div class="section-tab-item" :class="{ active: currentTab === 'Overview' }" @click="switchTab('Overview')">
          {{ t('factory.Overview.subtitle') }}
        </div>
        <div class="section-tab-item" :class="{ active: currentTab === 'Production' }" @click="switchTab('Production')">
          {{ t('factory.production.subtitle') }}
        </div>
        <div class="section-tab-item" :class="{ active: currentTab === 'Testing' }" @click="switchTab('Testing')">
          {{ t('factory.testing.subtitle') }}
        </div>
      </div>
    </div>

    <NuxtPage />

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import factoryBannerPc from '~/assets/images/Factory/factory_banner_pc.jpg'
import factoryBannerMobile from '~/assets/images/Factory/factory_banner-mobile.jpg'



const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth <= 768
})
// 路由Tab切换状态（优先从路由获取，实现路由联动）
const currentTab = computed(() =>
  route.path === `/Factory/Testing` ? 'Testing' : route.path === `/Factory/Overview` ? 'Overview' : 'Production'
);

// 切换Tab + 路由跳转
const switchTab = (tab: 'Production' | 'Testing' | 'Overview') => {
  // currentTab.value = tab;
  // 根据Tab跳转对应路由
  if (tab === 'Testing') {
    router.push(`/Factory/Testing`);
  } else if (tab === 'Overview') {
    router.push(`/Factory/Overview`); // 生产板块默认跳回首页（可根据实际需求修改）
  }
  else {
    router.push(`/Factory/Production`); // 生产板块默认跳回首页（可根据实际需求修改）
  }
};

// 监听路由变化，同步Tab状态
onMounted(() => {
  // currentTab.value = 'Overview'
  if (route.path === `/Factory`) {
    router.push(`/Factory/Overview`)
  }
});

// 图片预览相关状态
const previewVisible = ref(false)



// 关闭图片预览
const closeImagePreview = () => {
  previewVisible.value = false
  // 恢复页面滚动
  document.body.style.overflow = 'auto'
}

// 监听ESC键关闭预览
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && previewVisible.value) {
    closeImagePreview()
  }
}

// 挂载和卸载时绑定/解绑键盘事件
onMounted(() => {
  globalThis.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  globalThis.removeEventListener('keydown', handleEscKey)
})



</script>

<style scoped>
/* 基础样式 */
.factory-module {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  box-sizing: border-box;
}

.factory-title {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 60px;
}

/* 路由Tab切换样式 */
.factory-header {
  margin-bottom: 30px;
}

.section-tab-wrapper {
  display: flex;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-tab-item {
  padding: 12px 30px;
  background: #f5f5f5;
  color: #666;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  white-space: nowrap;
}

.section-tab-item.active {
  background: #0095d7;
  color: #fff;
}

.section-tab-item:hover:not(.active) {
  background: #eee;
  color: #333;
}

/* 板块通用样式 */
.factory-section {
  margin-bottom: 80px;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  border-left: 4px solid #0095d7;
  padding-left: 12px;
  margin-bottom: 20px;
}

.section-desc {
  font-size: 20px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 40px;
}

.desc-detail {
  margin-top: 16px;
  font-size: 14px;
  color: #777;
}

/* 生产流程步骤样式 */
.production-steps {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.step-item {
  display: grid;
  gap: 40px;
  align-items: center;
}

/* 奇数项：文字在左40%，图片在右60% */
.step-item:not(.reverse) {
  grid-template-columns: 4fr 6fr;
}

.step-item:not(.reverse) .step-content {
  order: 1;
}

.step-item:not(.reverse) .step-image {
  order: 2;
}

/* 偶数项：图片在左60%，文字在右40% */
.step-item.reverse {
  grid-template-columns: 6fr 4fr;
}

.step-item.reverse .step-image {
  order: 1;
}

.step-item.reverse .step-content {
  order: 2;
}

.step-content {
  padding: 20px;
}

.step-number {
  min-width: 50px;
  height: 50px;
  background: #0095d7;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.step-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-title-en {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #888;
  margin-top: 4px;
}

.step-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
}

.step-desc-en {
  color: #888;
  font-size: 13px;
  margin-top: 8px;
  display: block;
}

.step-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 测试设备样式 */
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.equipment-item {
  text-align: center;
}

.equipment-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.equipment-name {
  font-size: 16px;
  color: #333;
}

.equipment-name-en {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

/* 测试流程图片 */
.process-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.process-img-item {
  border-radius: 4px;
  overflow: hidden;
}

.process-images img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* 可点击图片样式 */
.clickable-image {
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.clickable-image:hover {
  transform: scale(1.02);
}

/* 图片预览弹窗样式 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.preview-close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #fff;
  font-size: 40px;
  font-weight: 300;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 10;
}

.preview-close-btn:hover {
  color: #ccc;
}

.preview-content {
  max-width: 90%;
  max-height: 90%;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .section-desc {
    font-size: 16px;
  }

  .cerImg {
    width: 80% !important;
  }

  .factory-header {
    display: block;
  }

  .factory-module {
    padding: 20px 10px;
  }

  .factory-title {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .section-tab-item {
    padding: 10px 20px;
    font-size: 16px;
  }

  .section-subtitle {
    font-size: 20px;
  }

  /* 移动端：单列上下布局 */
  .step-item,
  .step-item.reverse {
    grid-template-columns: 1fr !important;
    gap: 20px;
  }

  /* 移动端统一布局顺序：文字在上，图片在下 */
  .step-item .step-content,
  .step-item.reverse .step-content {
    order: 1 !important;
  }

  .step-item .step-image,
  .step-item.reverse .step-image {
    order: 2 !important;
  }

  .step-image {
    height: 220px;
  }

  .step-number {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  .step-title {
    font-size: 18px;
  }

  .step-desc {
    font-size: 14px;
  }

  .equipment-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .process-images {
    grid-template-columns: repeat(2, 1fr);
  }

  .preview-close-btn {
    font-size: 30px;
    top: 15px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  .section-tab-wrapper {
    width: 100%;
  }

  .section-tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
  }

  .equipment-grid {
    grid-template-columns: 1fr;
  }

  .process-images {
    grid-template-columns: 1fr;
  }

  .step-image {
    height: 160px;
  }
}
</style>