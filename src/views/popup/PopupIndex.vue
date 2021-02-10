<template>
  <div class="popup-page-wrapper">
    <el-switch v-model="popup" inactive-text="弹窗开关"></el-switch>
    <el-divider class="narrow-divider"></el-divider>
    <el-switch v-model="popup" inactive-text="弹窗开关"></el-switch>
  </div>
</template>
<script>
export default {
  name: 'PopupIndex',
  data() {
    return {
      popup: true
    }
  }
}
</script>
<style scoped>
</style>
