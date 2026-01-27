<template>
  <div>
    <SkeletonComponent :loading="loading" />

    <div v-show="!loading" class="product-detail-container" v-if="productDetail">
      <div class="swiper-wrapper">
        <client-only>
          <detailSwiper class="detail-swiper" :swiperList="productDetail?.imageUrls || []" />
        </client-only>
      </div>

      <div class="product-detail-info-container">
        <div class="product-title">
          {{ productDetail?.name || '' }}
        </div>

        <div class="product-buy-button-wrapper" @click="isInquire = true">
          <div style="display: block; cursor: pointer; border-radius: 50px" >
            {{ $t('productDetail.shopNow') }}
          </div>
        </div>
        <!-- About This Item -->
        <div class="product-detail-info-wrapper">
          <div v-if="productAttrList && productAttrList.length > 0">
            <div class="product-detail-info-item-title">
              {{ $t('productDetail.AboutThisItem') }}
            </div>

            <div class="specs-grid">
              <div v-for="(item, index) in productAttrList" :key="item.id || index" class="specs-item">
                <div class="specs-label">{{ item.name }} : </div>
                <div class="specs-value">{{ item.value }}</div>
              </div>
            </div>
          </div>


          <div v-if="productDetail.drivers && productDetail.drivers.length > 0"
            class="product-detail-info-item-title section-mt">
            Product Drivers
          </div>
          <div v-if="productDetail.drivers && productDetail.drivers.length > 0"
            class="product-detail-info-item-content download-list">
            <a v-for="item in productDetail.drivers" :key="item.fileId" :href="item.url" target="_blank"
              class="download-item">
              <SvgIcon name="download" size="22" />
              <span>{{ item.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品描述图片 -->
    <div class="product-detail-info-item-content">
      <img v-for="item in productBanner" :src="item" alt="" class="product-banner">
    </div>
    <!-- <div class="product-category-container">
      <cardPeekList :id="String(route.query.categoryId || '')" :title="String(route.query.cardName || '')"
        :card-list="productCategoryList.slice(0, 6)" />
    </div> -->

    <el-dialog v-model="isInquire" top="30px" :width="windowWidth" :close-on-click-modal="true"
      :close-on-press-escape="false" :show-close="true">
      <ContactForm :productSpuId="productDetail.id" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElDialog } from 'element-plus'
import detailSwiper from '~/components/product-detailInfo/detail-swiper.vue'
import SkeletonComponent from '~/components/skeleton-component.vue'
import SvgIcon from '~/components/SvgIcon.vue'
import ContactForm from '~/components/product-detailInfo/ContactForm_singleOption.vue'

const route = useRoute()
const isInquire = ref(false)
const loading = ref(true)
const windowWidth = ref('90%')
onMounted(() => {
  windowWidth.value = globalThis.innerWidth <= 700 ? '90%' : '50%'
})

const currentId = computed(() => route.params.id as string)
const { t, locale } = useI18n()
const productBanner = ref([])


const { data: productAttrList } = useAsyncData(() => `getproductAttrList-${locale.value}-${currentId.value}`, async () => {
  const productId = route.params.id as string
  const fetchWithLocale = useFetchWithLanguageWithLocale(locale.value)
  try {
    const response = await fetchWithLocale.post(`/product/getProductSpuAttrList`, {
      productSpuId: productId
    })

    console.log('获取产品属性列表成功')
    return response.data || []
  } catch (err) {
    console.warn('获取产品属性列表失败:', err)
    return [] // 返回空数组作为回退
  }
}, {
  watch: [locale, currentId]
})


const { data: productDetail } = useAsyncData(() => `getproductDetail-${locale.value}-${currentId.value}`, async () => {
  const productId = route.params.id as string
  const fetchWithLocale = useFetchWithLanguageWithLocale(locale.value)
  try {
    const response = await fetchWithLocale.get(`/product/getProductSpuDetail?id=${productId}`)

    console.log('获取产品详情成功' )
    return response.data || []

  } catch (err) {
    console.warn('获取产品详情失败:', err)
    return []
  }
}, {
  watch: [locale, currentId]
})


onMounted(() => {
  if (productDetail.value?.productSpuAboutList?.length) {
    productBanner.value = productDetail.value.productSpuAboutList.map(item => {
      return item?.imageUrls[0]
    })
  }
  loading.value = false
})


onMounted(() => {
  // productDetailInit()
})

watch([locale, currentId], () => {
  // productDetailInit()
})


</script>

<style scoped>
/* ================= 基础布局 ================= */
.product-detail-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 50px;
}

.swiper-wrapper {
  position: sticky;
  top: 100px;
  z-index: 9;
  height: fit-content;
  width: auto;
  margin-bottom: 3vw;
}

.detail-swiper {
  width: 500px;
}

.product-detail-info-container {
  flex: 1;
}

.product-title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
}

.product-buy-button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
  background-color: #000;
  color: #fff;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-detail-info-wrapper {
  margin: 40px 0;
}

.product-detail-info-item-content {
  text-align: center;
}

.product-banner {
  width: 100%;
  border-radius: 16px;
  margin-bottom: 10px;
}

@media screen and (min-width: 1200px) {
  .product-banner {
    max-width: 1160px;
  }
}

.product-detail-info-item-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.section-mt {
  margin-top: 40px;
}

/* ================= 一行两个参数的 Grid 布局 ================= */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* 核心：一行两列 */
  border-radius: 4px;
  overflow: hidden;
}

.specs-item {
  display: flex;
  /* border-bottom: 1px solid #ebeef5; */
}

.specs-label {
  /* min-width: 100px; */
  white-space: nowrap;
  font-weight: 600;
  color: #333;
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.specs-value {
  flex: 1;
  padding: 7px 15px;
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: center;
}

/* ================= 下载 & 适配 ================= */
.download-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.download-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a90e2;
  font-weight: 600;
  text-decoration: none;
}

@media screen and (max-width: 1200px) {
  .product-detail-container {
    flex-direction: column;
    padding: 15px;
    gap: 30px;
  }

  .swiper-wrapper {
    position: relative;
    top: auto;
  }

  .detail-swiper {
    width: 100%;
  }
}

/* 移动端适配：变回一行一个参数 */
@media screen and (max-width: 900px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .specs-item {
    flex-direction: row;
  }

  .specs-label {
    /* width: 130px; */
    border-right: none;
    /* border-bottom: 1px solid #ebeef5; */
    padding: 8px 12px;
  }

  .specs-value {
    padding: 10px 0px;
  }

  .product-banner {
    width: 100%;
    border-radius: 0;
    margin-bottom: 0;
    display: block;
  }
}
</style>