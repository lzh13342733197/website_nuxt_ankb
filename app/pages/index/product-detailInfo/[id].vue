<!-- app/pages/product-detailInfo/[id].vue -->
<template>
  <div class="product-detail">
    <h1>产品详情 ID：{{ route.params.id }}</h1>
    <!-- 你的产品详情内容 -->
  </div>
</template>

<script setup>
// 获取路由参数 id
const route = useRoute()
// 打印参数，验证是否获取成功
console.log('产品 ID：', route.params.id)

// 如果你需要兼容旧的查询参数（?id=xxx），可加兼容逻辑
const productId = route.params.id || route.query.id
</script>