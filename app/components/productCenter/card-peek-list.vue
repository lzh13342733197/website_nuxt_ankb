<template>
  <div class="card-peek-wrapper">
    <div ref="wrapperRef" class="card-peek-list-wrapper">
      <div ref="cardPeekListRef" class="card-peek-list">
        <card-preview 
          v-for="item in props.cardList" 
          :key="item.id" 
          :detail="item" 
          :categoryId="props.id"
          :card-name="props.title" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import cardPreview from './card-preview.vue'
import { useWindowSize } from '@vueuse/core'

const titleRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const cardPeekListRef = ref<HTMLElement | null>(null)
let minCardDistance: number = 200
const documentPosition = ref<any>(null)

const props = defineProps<{
  id: string
  title: string
  cardList: any[]
}>()

const { width: windowWidth } = useWindowSize()

onMounted(() => {
  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
  }
})

watch([() => windowWidth, () => props.cardList], () => {
  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
  }
}, { immediate: true })

defineExpose({
  documentPosition,
  id: props.id,
})
</script>

<style scoped>
/* ========== 容器样式 ========== */
.card-peek-wrapper {
  padding: 40px 0;
  /* background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%); */
}

.card-peek-list-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  overflow: hidden;
}

.card-peek-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  padding: 20px 0;
}

/* ========== 响应式布局 ========== */
@media (max-width: 1200px) {
  .card-peek-list {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .card-peek-wrapper {
    padding: 24px 0;
  }

  .card-peek-list-wrapper {
    padding: 0 16px;
  }

  .card-peek-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .card-peek-list {
    gap: 12px;
  }
}

/* ========== 加载动画 ========== */
.card-peek-list :deep(.card-preview-container) {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 标题样式（如果需要） ========== */
.card-peek-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 32px;
  padding-left: 200px;
}

@media (max-width: 768px) {
  .card-peek-title {
    font-size: 24px;
    padding-left: 0;
    text-align: center;
  }
}
</style>