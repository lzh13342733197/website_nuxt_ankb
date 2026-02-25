<template>
  <header class="header-container">
    <div class="header-content">
      <!-- Logo -->
      <div class="nav-item nav-logo">
        <NuxtLink to="/" class="logo-link">
          <img src="/ankbit.png" class="logo-image" alt="Logo" />
        </NuxtLink>
      </div>

      <!-- PC Menu -->
      <nav class="nav-item nav-main-menu menu-pc">
        <div v-for="menu in menus" :key="menu.id" class="main-nav-group" @mouseenter="openSubMenu(menu.id)"
          @mouseleave="closeSubMenu(menu.id)">
          <NuxtLink :to="menu.url" class="main-nav-link" :class="{ 'is-active': menu.isActive }">
            <span class="nav-text">{{ t(menu.name) }}</span>
            <span v-if="menu.children && menu.children.length" class="nav-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8z" />
              </svg>
            </span>
          </NuxtLink>

          <!-- 子菜单 -->
          <ul v-if="menu.children && menu.children.length" class="sub-nav-group"
            :class="{ 'is-open': activeSubMenuId === menu.id }">
            <li v-for="sub in menu.children" :key="sub.id" class="sub-nav-item">
              <a v-if="sub.imageUrl" :href="sub.url" class="sub-nav-link with-image"
                :class="{ 'is-active': isPathMatch(sub.url) }">
                <img :src="sub.imageUrl" alt="Category" class="category-image">
                <span class="category-name">{{ sub.name }}</span>
              </a>
              <a v-else :href="sub.url" class="sub-nav-link" :class="{ 'is-active': isPathMatch(sub.url) }">
                {{ sub.name }}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- PC端搜索框（移动端隐藏） -->
      <div class="search-box search-box-pc" @click="isSearchExpanded = true; isMobileMenuOpen = false">
        <input type="text" :placeholder="t('navigationBar.pleaseInputKeyword')" class="search-input"
          @keydown.enter.prevent>
        <div class="search-icon"
          style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
          <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
          </SvgIcon>
        </div>
      </div>

      <div class="nav-item nav-toolbar">
        <!-- Mobile Tools -->
        <div class="tools-mobile">
          <button class="hamburger-btn" @click="isMobileMenuOpen = !isMobileMenuOpen"
            :class="{ 'is-open': isMobileMenuOpen }">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>

      <!-- 搜索弹窗组件 -->
      <div>
        <SearchModal :is-visible="isSearchExpanded" @close="closeSearch" @select="handleSearchSelect"
          @open="isSearchExpanded = true" />
      </div>
    </div>

    <!-- Mobile Drawer -->
    <client-only>
      <el-drawer v-model="isMobileMenuOpen" direction="rtl" size="75%" :with-header="false" class="mobile-drawer">
        <div class="mobile-drawer-content" v-if="isMobileMenuOpen">
          <div class="mobile-drawer-header">
            <img src="/ankbit.png" class="drawer-logo" alt="Logo" />
            <!-- 移动端搜索框（仅在抽屉中显示） -->
            <div class="search-box search-box-mobile" @click="isSearchExpanded = true; isMobileMenuOpen = false">
              <input type="text" :placeholder="t('navigationBar.pleaseInputKeyword')" class="search-input"
                @keydown.enter.prevent>
              <div class="search-icon"
                style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
                <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
                </SvgIcon>
              </div>
            </div>
          </div>

          <nav class="mobile-nav-list">
            <template v-for="menu in menus" :key="menu.id">
              <div class="mobile-nav-item">
                <NuxtLink :to="menu.url" class="mobile-nav-link" :class="{ 'is-active': menu.isActive }"
                  @click="!menu.children && (isMobileMenuOpen = false)">
                  {{ t(menu.name) }}
                  <svg v-if="menu.children && menu.children.length" class="expand-icon" width="16" height="16"
                    viewBox="0 0 12 12" fill="currentColor">
                    <path d="M8 6L4 2v8z" />
                  </svg>
                </NuxtLink>

                <!-- Mobile Sub Menu -->
                <ul v-if="menu.children && menu.children.length" class="mobile-sub-nav">
                  <li v-for="sub in menu.children" :key="sub.id">
                    <a :href="sub.url" class="mobile-sub-link" @click="isMobileMenuOpen = false">
                      {{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </template>
          </nav>
        </div>
      </el-drawer>
    </client-only>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { ElDrawer } from 'element-plus'
import { useCategoryStore } from '@/stores/category'

type Category = {
  id: number
  name: string
  imageUrl: string
  url: string
}

// 搜索相关
const isSearchExpanded = ref(false)
const closeSearch = () => { isSearchExpanded.value = false }
const handleSearchSelect = (result: any) => { console.log('Selected search result:', result) }

// 分类数据
const productCategoryList = ref<Category[]>([])
const categoryStore = useCategoryStore()
const route = useRoute()
const { t, locale } = useI18n()

// 移动端状态
const isMobileMenuOpen = ref(false)
const isMobileLangOpen = ref(false)
const isLangOpen = ref(false)
const isMobile = ref(false)
const activeSubMenuId = ref<number | null>(null)

// 子菜单控制
const openSubMenu = (id: number) => { activeSubMenuId.value = id }
const closeSubMenu = (id: number) => { activeSubMenuId.value = null }

// 路径匹配
const isPathMatch = (menuUrl: string) => {
  return route.fullPath === menuUrl
}

// 监听窗口大小
onMounted(() => {
  isMobile.value = window.innerWidth <= 992
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 992
  })
})

// 导航菜单数据
const menus = computed(() => {
  const list = [
    { id: 1, name: 'navigationBar.Home', url: '/home' },
    {
      id: 2,
      name: 'navigationBar.AboutUs',
      url: '/about',
      children: [
        { id: 1, name: t('aboutUs.menu.CompanyProfile'), url: `/about/CompanyProfile` },
        { id: 5, name: t('aboutUs.menu.RAD'), url: `/about/PatentSwiper` },
        { id: 3, name: t('aboutUs.menu.Awards'), url: `/about/Awards` },
        { id: 6, name: t('aboutUs.Credentials'), url: `/about/Credentials` },
        { id: 4, name: t('aboutUs.menu.DevelopmentCourse'), url: `/about/DevelopmentCourse` },
      ]
    },
    {
      id: 8,
      name: 'navigationBar.Factory',
      url: '/Factory',
      children: [
        { id: 81, name: `${t("navigationBar.Overview")}`, url: `/Factory/Overview` },
        { id: 82, name: `${t("navigationBar.Production")}`, url: `/Factory/Production` },
        { id: 83, name: `${t("navigationBar.Testing")}`, url: `/Factory/Testing` },
      ]
    },
    {
      id: 3,
      name: 'navigationBar.Products',
      url: '/products',
      children: productCategoryList.value
    },
    { id: 4, name: 'navigationBar.Exhibitions', url: '/news' },
    { id: 5, name: 'navigationBar.Blog', url: '/Blog' },
    { id: 6, name: 'navigationBar.Contact', url: '/contact' }
  ]

  return list.map(item => ({
    ...item,
    isActive: route.path === `${item.url}`
  }))
})

// 语言切换
const toggleLang = () => {
  isLangOpen.value = !isLangOpen.value
}

// 加载分类数据
onMounted(async () => {
  await nextTick()
  const categoryList = await categoryStore.fetchCategoryList(locale.value) || []

  productCategoryList.value = categoryList.map((item: Category) => ({
    url: `/ProductCenter/${item.id}`,
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl
  }))
})

// 监听语言变化更新分类
watch(() => locale.value, async (newLocale) => {
  const categoryList = await categoryStore.fetchCategoryList(newLocale) || []
  productCategoryList.value = categoryList.map((item: Category) => ({
    url: `/ProductCenter/${item.id}`,
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl
  }))
})
</script>

<style scoped>
/* ========== 基础容器 ========== */
.header-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 70px;
}

/* ========== Logo ========== */
.nav-logo {
  flex-shrink: 0;
}

.logo-link {
  display: block;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-image {
  height: 50px;
  width: auto;
  display: block;
}

/* ========== PC 导航菜单 ========== */
.menu-pc {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 0 40px;
}

.main-nav-group {
  position: relative;
}

.main-nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 18px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
}

.main-nav-link::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0095d7, #00b4d8);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.main-nav-link:hover::after,
.main-nav-link.is-active::after {
  width: 60%;
}

.main-nav-link:hover,
.main-nav-link.is-active {
  color: #0095d7;
}

.nav-arrow {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.main-nav-group:hover .nav-arrow {
  transform: rotate(180deg);
}

/* ========== 子菜单 ========== */
.sub-nav-group {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  background: #fff;
  border-radius: 8px;
  min-width: 200px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1010;
}

.sub-nav-group.is-open {
  opacity: 1;
  visibility: visible;
}

.sub-nav-item {
  margin: 0;
}

.sub-nav-link {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.sub-nav-link:hover {
  background: linear-gradient(90deg, #f0f9ff 0%, #e6f7ff 100%);
  color: #0095d7;
  padding-left: 24px;
}

.sub-nav-link.is-active {
  background: linear-gradient(90deg, #e6f7ff 0%, #d4f1ff 100%);
  color: #0095d7;
  font-weight: 600;
}

.sub-nav-link.with-image {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-image {
  width: 45px;
  height: 45px;
  border-radius: 6px;
  object-fit: cover;
  border: 2px solid #f0f0f0;
  transition: all 0.2s ease;
}

.sub-nav-link:hover .category-image {
  border-color: #0095d7;
  transform: scale(1.05);
}

.category-name {
  min-width: 120px;
}

/* ========== PC 工具栏 ========== */
.nav-toolbar {
  flex-shrink: 0;
}

.tools-pc {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lang-switch-wrapper {
  position: relative;
}

.lang-switch-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.lang-switch-btn:hover {
  border-color: #0095d7;
  background: #f0f9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 149, 215, 0.15);
}

.lang-icon {
  stroke-width: 2;
}

.lang-text {
  font-weight: 600;
  min-width: 24px;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.arrow-icon.is-open {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  list-style: none;
  padding: 6px;
  margin: 0;
  min-width: 140px;
  z-index: 1020;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  text-decoration: none;
  color: #333;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.lang-option:hover {
  background: linear-gradient(90deg, #f0f9ff 0%, #e6f7ff 100%);
  color: #0095d7;
}

.lang-flag {
  font-size: 18px;
}

/* ========== 移动端工具栏 ========== */
.tools-mobile {
  display: none;
  align-items: center;
  gap: 16px;
}

.mobile-lang-switch {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-lang-switch:hover {
  border-color: #0095d7;
  background: #f0f9ff;
}

.lang-icon-mobile {
  stroke-width: 2;
}

.mobile-lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  list-style: none;
  padding: 6px;
  margin: 0;
  min-width: 120px;
  z-index: 1020;
}

.mobile-lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  text-decoration: none;
  color: #333;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.mobile-lang-option:hover {
  background: #f0f9ff;
  color: #0095d7;
}

/* ========== 汉堡菜单按钮 ========== */
.hamburger-btn {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.hamburger-line {
  width: 24px;
  height: 2.5px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn:hover .hamburger-line {
  background: #0095d7;
}

.hamburger-btn.is-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.is-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.is-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* ========== 移动端抽屉 ========== */
.mobile-drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
}

.mobile-drawer-header {
  padding: 20px;
  border-bottom: 2px solid #e9ecef;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 增加logo和搜索框的间距 */
}

.drawer-logo {
  height: 40px;
  width: auto;
  align-self: flex-start; /* logo左对齐 */
}

.mobile-nav-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.mobile-nav-item {
  margin-bottom: 4px;
}

.mobile-nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.is-active {
  background: linear-gradient(90deg, #f0f9ff 0%, transparent 100%);
  border-left-color: #0095d7;
  color: #0095d7;
}

.expand-icon {
  transition: transform 0.3s ease;
}

.mobile-sub-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f8f9fa;
}

.mobile-sub-link {
  display: block;
  padding: 12px 20px 12px 40px;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  transition: all 0.2s ease;
}

.mobile-sub-link:hover {
  background: #fff;
  color: #0095d7;
  padding-left: 44px;
}

/* ========== 搜索框样式 ========== */
.search-box-pc {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
}

.search-box-mobile {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  width: 100%; /* 移动端搜索框占满宽度 */
  box-sizing: border-box;
}

.search-input {
  border: none;
  outline: none;
}

.search-box-pc .search-input {
  width: 120px; /* PC端搜索框宽度 */
}

.search-box-mobile .search-input {
  flex: 1; /* 移动端输入框占满剩余宽度 */
  font-size: 14px;
  padding: 2px 0;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

/* ========== 响应式 ========== */
@media (max-width: 1200px) {
  .header-content {
    padding: 0 24px;
  }

  .menu-pc {
    margin: 0 20px;
    gap: 4px;
  }

  .main-nav-link {
    padding: 24px 14px;
    font-size: 14px;
  }
}

@media (max-width: 992px) {
  /* 移动端隐藏PC搜索框和PC工具栏 */
  .menu-pc,
  .tools-pc,
  .search-box-pc {
    display: none !important;
  }

  /* 显示移动端工具栏 */
  .tools-mobile {
    display: flex;
  }

  .header-content {
    height: 60px;
    padding: 0 20px;
  }

  .logo-image {
    height: 40px;
  }
  .nav-toolbar {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: right;
}
}

/* 滚动条样式 */
.mobile-nav-list::-webkit-scrollbar {
  width: 6px;
}

.mobile-nav-list::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 3px;
}

.mobile-nav-list::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>