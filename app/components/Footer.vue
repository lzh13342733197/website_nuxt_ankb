<template>
  <div style="margin: 20px auto ;display: block;">
    <hr />
    <brief-introduction/>
    <hr />
    <div class="copyright-statement">@copyright</div>
    <div class="copyright-statement">
      <router-link :to="`/${locale}/privacy`" target="_blank" class="privacy-policy">
        privacy Policy</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  const { t ,locale} = useI18n()
</script>

<style scoped>
.copyright-statement {
  text-align: center;
  font-size: 10px;
  color: #999;
  padding: 10px;
}

hr {
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.privacy-policy {
  margin: 0 0;
  text-decoration: none;
  color: #5f5d5d;
}

.privacy-policy:hover {
  cursor: pointer;
}
</style>
