<template>
  <header class="header-container">
    <div class="header-content">

      <!-- Logo -->
      <div class="nav-item nav-logo">
        <NuxtLink to="/" class="logo-link">
          <img src="/ankbit.png" class="logo-image" />
        </NuxtLink>
      </div>

      <!-- PC Menu -->
      <nav class="nav-item nav-main-menu menu-pc">
        <div v-for="menu in menus" :key="menu.id" class="main-nav-group">
          <NuxtLink :to="menu.url" class="main-nav-link" :class="{ 'is-active': menu.isActive }">
            {{ t(menu.name) }}
          </NuxtLink>
        </div>
      </nav>

      <!-- Toolbar -->
      <div class="nav-item nav-toolbar">

        <!-- PC -->
        <div class="tools-pc" v-if="!isMobile">
          <div class="lang-switch">
            <div class="lang-switch-border" @click="toggleLang">
              {{ locale === 'zh' ? 'Chinese' : 'English' }}
              <span>{{ isLangOpen ? '▲' : '▼' }}</span>
            </div>
            <ul v-if="isLangOpen" class="mobile-lang-list">
              <!-- <li @click="switchLocalePath('zh')">中文</li>
              <li @click="switchLocalePath('en')">English</li> -->
              <li>
                <SwitchLocalePathLink style="   color: black; text-decoration: none;" locale="zh">Chinese
                </SwitchLocalePathLink>
              </li>
              <li>
                <SwitchLocalePathLink style="   color: black; text-decoration: none;" locale="en">English
                </SwitchLocalePathLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Mobile -->
        <div class="tools-mobile">
          <div class="mobile-lang-switch" @click="isMobileLangOpen = !isMobileLangOpen"
            @mouseleave="isMobileLangOpen = false">
            {{ locale === 'zh' ? 'Chinese' : 'English' }}
            <span class="arrow-icon">{{ isMobileLangOpen ? '▲' : '▼' }}</span>
            <ul v-if="isMobileLangOpen" class="mobile-lang-list">
              <li>
                <SwitchLocalePathLink style=" display: block; color: black; text-decoration: none;" locale="zh">Chinese
                </SwitchLocalePathLink>
              </li>
              <li>
                <SwitchLocalePathLink style=" display: block; color: black; text-decoration: none;" locale="en">English
                </SwitchLocalePathLink>
              </li>
            </ul>
          </div>
          <button class="hamburger-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
            ☰
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Drawer -->
    <client-only>
      <el-drawer v-model="isMobileMenuOpen" direction="rtl" size="60%" :with-header="false">
        <nav class="mobile-nav-list" v-if="isMobileMenuOpen">
          <NuxtLink v-for="menu in menus" :key="menu.id" :to="menu.url" class="mobile-nav-link"
            :class="{ 'is-active': menu.isActive }" @click="isMobileMenuOpen = false">
            {{ t(menu.name) }}
          </NuxtLink>
        </nav>

      </el-drawer>
    </client-only>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { ElDrawer } from 'element-plus'
const route = useRoute()
const { t, locale } = useI18n()
const isMobileMenuOpen = ref(false)
const isMobileLangOpen = ref(false)
const isLangOpen = ref(false)
const isMobile = ref(false)
onMounted(() => {
  // 客户端初始化
  isMobile.value = window.innerWidth <= 768
  // 监听窗口缩放
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
})
/* 菜单 */
const menus = computed(() => {
  const list = [
    { id: 1, name: 'navigationBar.Home', url: '/home' },
    { id: 2, name: 'navigationBar.AboutUs', url: '/about' },
    { id: 3, name: 'navigationBar.Products', url: '/products' },
    { id: 4, name: 'navigationBar.Exhibitions', url: '/news' },
    { id: 5, name: 'navigationBar.Blog', url: '/Blog' },
    { id: 6, name: 'navigationBar.Contact', url: '/contact' }
  ]
  console.log(route.path)
  return list.map(item => ({
    ...item,
    isActive: route.path === `/${locale.value}${item.url}`
  }))
})

/* 语言切换 */
const toggleLang = () => {
  isLangOpen.value = !isLangOpen.value
}

const setLang = (lang: 'zh' | 'en') => {
  locale.value = lang
  isLangOpen.value = false
}
</script>

<style scoped>
.header-container {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1000;
  border-bottom: 1px solid #eee;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
}

.menu-pc {
  display: flex;
  gap: 20px;
}

.main-nav-link {
  color: #333;
  text-decoration: none;
}

.main-nav-link.is-active {
  color: #0095d7;
}

.tools-mobile {
  display: none;
}

.hamburger-btn {
  font-size: 22px;
  background: none;
  border: none;
}

.mobile-nav-link {
  display: block;
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #333;
}

.mobile-nav-link.is-active {
  color: #0095d7;
}

@media (max-width: 1200px) {
  .menu-pc {
    display: none;
  }

  .tools-mobile {
    display: block;
  }
}

.header-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.logo-image {
  height: 60px;
  width: auto;
}

.menu-pc {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
}

.main-nav-group {
  position: relative;
  padding: 0 15px;
  cursor: pointer;
}

.main-nav-link {
  white-space: nowrap;
  display: block;
  padding: 15px 0;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.main-nav-link:hover,
.main-nav-link.is-active {
  color: #0095d7;
}

.is-active {
  color: #0095d7 !important;
}

.sub-nav-group {
  position: absolute;
  top: 100%;
  left: 0%;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #eee;
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1010;
}

.sub-nav-group.is-open {
  display: block;
}

.sub-nav-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #666;
}

.sub-nav-link:hover {
  background-color: #f5f5f5;
  color: #0095d7;
}

.category-image {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.nav-toolbar {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.tools-pc {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-switch {
  position: relative;
}

.lang-switch-border {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 9px;
  cursor: pointer;
  display: flex;
  width: 100px;
  justify-content: space-around;
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
}

.search-input {
  border: none;
  outline: none;
  width: 120px;
}

.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-logo {
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #eee;
}

.mobile-nav-list {
  margin-top: 10px;
}

.mobile-nav-link {
  display: block;
  padding: 15px 0;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f9f9f9;
  font-size: 16px;
}

.mobile-nav-link.is-active {
  color: #0095d7;
  font-weight: bold;
}

.mobile-search-box {
  margin-top: 20px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  justify-content: center;
  align-items: center;
}

.mobile-search-box .search-input {
  flex: 1;
  padding: 8px;
  border: none;
}

.tools-mobile {
  display: none;
  align-items: center;
  gap: 15px;
}

.hamburger-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.mobile-lang-switch {
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.mobile-lang-list {
  position: absolute;
  width: 100%;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 5px 0;
  margin-top: 0;
  /* 贴合边框 */
  z-index: 1020;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-lang-list li {
  padding: 8px 10px;
  color: #333;
}

.active {
  background-color: #f5f5f5;
  color: #0095d7 !important;
}

.mobile-lang-list li:hover {
  background-color: #f5f5f5;
  color: #0095d7;
}

@media (max-width: 992px) {

  .menu-pc,
  .tools-pc {
    display: none !important;
  }

  .tools-mobile {
    display: flex;
  }
}

@media (min-width: 993px) {

  .menu-pc,
  .tools-pc {
    display: flex;
  }

  .tools-mobile {
    display: none !important;
  }

  .search-input {
    width: 80px;
  }
}
</style>
