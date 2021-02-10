<template>
  <div class="option-page-wrapper">
    <el-switch v-model="option" inactive-text="选项开关"></el-switch>
    <el-divider class="narrow-divider"></el-divider>
    <el-switch v-model="option" inactive-text="选项开关"></el-switch>
  </div>
</template>
<script>
export default {
  name: 'OptionIndex',
  data() {
    return {
      option: true
    }
  }
}
</script>
<style scoped>
</style>
