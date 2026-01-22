<template>
  <svg
    :class="['icon', className]"
    :width="size"
    :height="size"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
// 定义组件 props
const props = defineProps({
  // 图标名称（对应 SVG 文件名，子目录需加目录名，如 subdir-arrow）
  name: {
    type: String,
    required: true
  },
  // 图标大小
  size: {
    type: [Number, String],
    default: 16
  },
  // 自定义类名
  className: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>