// stores/category.js
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categoryList: [],
    loading: false, // 可选：加载状态
  }),
  getters: {
    categoryListData: (state) => state.categoryList,
  },
  actions: {
    async fetchCategoryList(locale) {
      // 避免重复请求（可选）
      // if (this.categoryList.length > 0) return
      this.loading = true;
      const fetchWithLocale = useFetchWithLanguageWithLocale(locale);
      try {
        const response = await fetchWithLocale.post(
          `/product/getCategoryList`,
          {},
        );
        this.categoryList = response?.data || [];
      } catch (err) {
        console.warn("获取分类列表失败:", err);
        this.categoryList = [];
      } finally {
        this.loading = false;
      }
      return this.categoryList;
    },
  },
  persist: {
    storage: import.meta.server ? undefined : sessionStorage,
    pick: ["categoryList"],
  },
});
