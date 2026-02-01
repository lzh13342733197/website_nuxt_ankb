<template>
  <div style="background-color: #fff;">
    <div class="top_img">
      <div class="top_img_container">
        <img v-if="!isMobile" style="width: 100%;display: block;" :src="news1920_300" alt="">
        <img v-else style="width: 100%;display: block;" :src="news500_200" alt="">
        <div class="top_img_title">Experience Tomorrow's Trends Today!</div>
      </div>
      <div style="margin-bottom: 60px;"></div>
      <div style="max-width: 1200px;margin: 0 auto;">
        <div class="page-title">Exhibitions</div>
      </div>
      <img v-if="!isMobile" style="width: 100%;display: block;" :src="fairBannerPc" alt="">
      <img v-else style="width: 100%;display: block;" :src="fairBannerMobile" alt="">
    </div>



  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

import news500_200 from '~/assets/images/Fari/500-200.jpg'
import news1920_300 from '~/assets/images/Fari/1920-300.jpg'
import fairBannerMobile from '~/assets/images/Fari/fair_banner_mobile.jpg'
import fairBannerPc from '~/assets/images/Fari/fair_banner-pc.jpg'

const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});

</script>

<style scoped>
.news-list-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 20px;
  background-color: #fff;
}
.top_img_container{
  position: relative;
}
.top_img_title{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 33px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}



.page-title {
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  border-left: 4px solid #0095D7;
  font-weight: 700;
  padding-left: 8px;
  line-height: 1.2;
  margin-bottom: 20px;
}

.news-container {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* --- 核心动画区域 --- */
.news-image-layout {
  perspective: 1000px;
  /* 增加3D感 */
  margin-bottom: 30px;
}

.stack-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 350px;
  margin: 0 auto;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.stack-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 4px solid #fff;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stack-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* 提示文字 */
.click-hint {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 149, 215, 0.8);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.stack-wrapper:hover .click-hint {
  opacity: 1;
}

/* --- 展开后的状态 --- */
.stack-wrapper.is-expanded {
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  max-width: 100%;
}

.is-expanded .stack-item {
  position: relative;
  height: 180px;
  transform: none !important;
  /* 清除旋转错位 */
  z-index: 1 !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
}

.is-expanded .stack-item:hover img {
  transform: scale(1.05);
}

/* --- 文字样式 --- */
.news-info-layout {
  text-align: left;
}

.news-date-text {
  font-size: 22px;
  font-weight: 800;
  color: #0095D7;
  display: block;
  margin-bottom: 5px;
}

.news-item-title {
  font-size: 20px;
  color: #333;
  margin: 0;
}

/* --- 移动端适配 --- */
@media (max-width: 768px) {
  .stack-wrapper {
    height: 220px;
    max-width: 90%;
  }

  .stack-wrapper.is-expanded {
    grid-template-columns: repeat(2, 1fr);
  }

  .is-expanded .stack-item {
    height: 120px;
  }

  .page-title {
    margin-left: 15px;
  }
  .top_img_title{
    font-size: 19px;
    white-space: nowrap;
  }
}

/* --- 灯箱效果 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 90%;
  max-height: 85%;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
}
</style>