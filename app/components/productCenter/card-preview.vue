<template>
  <a :href="`/product-detailInfo/${props.detail.id}`" class="card-preview-link">
    <div class="card-preview-container">
      <!-- 产品图片区域 -->
      <div class="card-image-wrapper">
        <img 
          :src="props.detail.imageUrls[0]" 
          :alt="props.detail.name" 
          class="card-image" 
          loading="lazy" />
      </div>
      
      <!-- 产品信息区域 -->
      <div class="card-info-wrapper">
        <h3 class="card-title">
          {{ props.detail.name }}
        </h3>
        
        <!-- 可选：添加更多信息 -->
        <!-- <div class="card-meta">
          <span class="card-category">{{ props.cardName }}</span>
        </div> -->
      </div>

      <!-- 悬停遮罩效果 -->
      <div class="card-overlay">
        <div class="overlay-content">
          <svg class="view-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" stroke-width="2"/>
          </svg>
          <p class="view-text">details</p>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps<{
  detail: any
  categoryId: string
  cardName: string
}>()
</script>

<style scoped>
/* ========== 链接容器 ========== */
.card-preview-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

/* ========== 卡片容器 ========== */
.card-preview-container {
  position: relative;
  background: #fff;
  border-radius: 16px;
  height: 420px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card-preview-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

/* ========== 图片区域 ========== */
.card-image-wrapper {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.card-preview-container:hover .card-image-wrapper {
  transform: translate(-50%, -50%) scale(1.05);
}

.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)); */
  transition: filter 0.3s ease;
}

.card-preview-container:hover .card-image {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

/* ========== 信息区域 ========== */
.card-info-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  
  /* 文本截断 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 50px;
  
  transition: color 0.3s ease;
}

.card-preview-container:hover .card-title {
  color: #0095d7;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.card-category {
  font-size: 13px;
  color: #666;
  padding: 4px 10px;
  background: #f5f5f5;
  border-radius: 12px;
}

/* ========== 悬停遮罩 ========== */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 149, 215, 0.95) 0%, rgba(0, 180, 216, 0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  z-index: 10;
}

.card-preview-container:hover .card-overlay {
  opacity: 1;
  visibility: visible;
}

.overlay-content {
  text-align: center;
  color: #fff;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.card-preview-container:hover .overlay-content {
  transform: translateY(0);
}

.view-icon {
  margin-bottom: 12px;
  animation: pulse 2s infinite;
}

.view-text {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

/* ========== 脉冲动画 ========== */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* ========== 平板端适配 ========== */
@media (max-width: 1024px) {
  .card-preview-container {
    height: 380px;
  }

  .card-image-wrapper {
    width: 180px;
    height: 180px;
  }

  .card-title {
    font-size: 16px;
    min-height: 44px;
  }
}

/* ========== 移动端适配 ========== */
@media (max-width: 768px) {
  .card-preview-container {
    height: 320px;
    border-radius: 12px;
  }

  .card-image-wrapper {
    top: 32%;
    width: 140px;
    height: 140px;
  }

  .card-info-wrapper {
    padding: 16px 12px;
  }

  .card-title {
    font-size: 14px;
    min-height: 40px;
    -webkit-line-clamp: 2;
  }

  /* 移动端禁用悬停效果 */
  .card-overlay {
    display: none;
  }

  /* 移动端直接显示微妙的阴影变化 */
  .card-preview-container:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

/* ========== 小屏手机适配 ========== */
@media (max-width: 480px) {
  .card-preview-container {
    height: 280px;
  }

  .card-image-wrapper {
    width: 120px;
    height: 120px;
    top: 30%;
  }

  .card-title {
    font-size: 13px;
    min-height: 36px;
  }

  .card-info-wrapper {
    padding: 12px 10px;
  }
}

/* ========== 加载骨架屏（可选） ========== */
.card-image.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ========== 无障碍优化 ========== */
.card-preview-container:focus-visible {
  outline: 3px solid #0095d7;
  outline-offset: 2px;
}

/* ========== 打印样式 ========== */
@media print {
  .card-overlay {
    display: none !important;
  }
  
  .card-preview-container {
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>