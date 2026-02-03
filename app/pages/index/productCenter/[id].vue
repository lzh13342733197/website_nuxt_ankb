<template>
  <div class="productCenter-head" style="margin-bottom: 40px;">
  </div>
  <!-- <SkeletonComponent  /> -->
  <div style="max-width: 1600px; margin: 0 auto; margin-bottom: 400px;">
    <div class="card-wrap-container" style="display: flex; flex-direction: column; gap: 20px;">
      <div class="leftOption">
        <production-option :category-list="categoryList" @changeOption="handleChangeOption" />
      </div>
      <div class="rightProduction">
        <card-peek-list ref="cardPeekListRef" :id="currentId" :title="'null'" :card-list="currentData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cardPeekList from '~/components/productCenter/card-peek-list.vue'
import { useTemplateRef, onMounted, ref, watch } from 'vue'
import SkeletonComponent from '~/components/skeleton-component.vue'
import { useRoute } from 'vue-router'
import productionOption from '~/components/productCenter/productionOption.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()
let currentId = ref('')


const cardPeekListRef = useTemplateRef('cardPeekListRef')

const curId = ref(route.params.id as string)

const activeId = ref('')
const handleChangeOption = (id: string) => {
  activeId.value = id
  currentId.value = id
}


const { data: categoryList } = useAsyncData(
  () => `categoryList-${locale.value}-${curId.value}`,
  async () => {
    const fetchWithLocale = useFetchWithLanguageWithLocale(locale.value)
    try {
      const data = await fetchWithLocale.post(
        `/product/getCategoryList`,
        {},
      )
      return [...data.data]
    } catch (error) {
      return []
    }
  },{
    watch: [locale]
  })

const { data: currentData } = useAsyncData(
  () => `currentData-${locale.value}-${curId.value}`, async () => {
    const productId = route.params.id as string
    const fetchWithLocale = useFetchWithLanguageWithLocale(locale.value)
    try {
      const fetchList =
        await fetchWithLocale.post(`/product/getProductSpuList`, {
          productCategoryId: productId,
        })
        // console.log('currentData---- fetchList.data')
        return fetchList.data
    } catch (error) {
      console.log(error)
    }
  },{
    watch: [locale, curId]
  })


const jumpToCategory = async (id: string) => {

  const refs = Array.isArray(cardPeekListRef.value)
    ? cardPeekListRef.value
    : [cardPeekListRef.value]
  const target = refs.find((item: any) => item.id === id)
  if (!target) return
  globalThis.scrollTo({
    top: target.documentPosition.top - 150,
    behavior: 'smooth',
  })
}


defineExpose({
  jumpToCategory,
})
</script>


<style scoped>
.swiperModule_ {
  margin-bottom: 40px;
  z-index: -1;
}

.card-wrap-container {
  width: 100%;
}

.productCenter-title {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

@media (max-width: 1355px) {
  .card-wrap-container {
    flex-direction: column;
  }

  .leftOption {
    display: flex;
    justify-content: center;
  }

  .productCenter-title {
    font-size: 25px;
    left: 26%;
  }

}

@media (min-width: 1355px) {
  .card-wrap-container {
    flex-direction: row;
  }

  .productCenter-title {
    font-size: 48px;
  }

  .card-wrap-container {
    padding: 0 20px;
  }
}

.productCenter-head {
  position: relative;
}
</style>
