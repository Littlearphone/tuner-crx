<template>
  <el-config-provider namespace="ep">
    <CdnRulesPanel/>
  </el-config-provider>
</template>
<script setup lang="ts">
import CdnRulesPanel from './components/CdnRulesPanel.vue'
</script>
<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  padding: 1em;
  width: calc(100% - 2em);
  height: calc(100% - 2em);

  .ep-card {
    width: 800px;
    height: 100%;

    &__body {
      height: calc(100% - 110px);

      .ep-table {
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>
