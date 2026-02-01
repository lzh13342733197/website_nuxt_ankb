<template>
  <div class="card-peek-wrapper">
    <!-- 修复核心：绑定模块化类名时，用 kebab-case 或 camelCase 匹配 -->
    <!-- 方式1：用对象的 kebab-case 键（和 less 中的类名一致） -->
    <div ref="wrapperRef" :class="styles['card-peek-list-wrapper']">
      <div ref="cardPeekListRef" :class="styles['card-peek-list']">
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
// 路径正确，无需修改
import styles from '~/components/pc.module.less'
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

// 验证：onMounted 中打印 DOM 的类名，确认绑定成功
onMounted(() => {
  console.log('wrapperRef 类名：', wrapperRef.value?.className); // 应输出 _card-peek-list-wrapper_z1vuu_34
  console.log('styles 对象：', styles);
  
  // 如果需要给 titleRef 绑定样式
  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
    // 可选：给 titleRef 绑定模块化的 title 样式
    titleRef.value.className = styles['card-peek-title']
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

<style scoped lang="less">
.card-peek-wrapper {
  padding: 0 0 20px 0;
}

/* 可选：如果子组件内的样式需要生效，用 :deep() 穿透 */
:deep(.card-preview) {
  /* 确保 card-preview 组件内的模块化样式生效 */
  margin: 0 8px;
}
</style>