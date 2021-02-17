<template>
  <div class="popup-page-wrapper">
    <el-switch v-model="enable" inactive-text="Baidu配置开关" @change="onSwitchChange"></el-switch>
    <!--<el-divider class="narrow-divider"></el-divider>-->
    <!--<el-switch v-model="enable" inactive-text="Baidu开关"></el-switch>-->
  </div>
</template>
<script>
const BaiduConfig = {
  enable: true
}
const backgroundPage = chrome.extension && chrome.extension.getBackgroundPage()
export default {
  name: 'BaiduConfig',
  beforeMount() {
    backgroundPage.findConfig.call(this, { Baidu: BaiduConfig })
  },
  data() {
    return {
      ...BaiduConfig
    }
  },
  methods: {
    onSwitchChange(enable) {
      BaiduConfig.enable = enable
      backgroundPage.saveConfig.call(this, { Baidu: { ...BaiduConfig } })
    }
  }
}
</script>
<style scoped>
/*.popup-page-wrapper {*/
/*  width: 400px;*/
/*  height: 300px;*/
/*}*/
</style>
