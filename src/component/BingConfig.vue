<template>
  <div class="popup-page-wrapper">
    <el-switch v-model="enable" inactive-text="Bing配置开关" @change="onConfigChange"></el-switch>
    <div class="options-wrapper" v-if="enable">
      <el-divider class="narrow-divider"></el-divider>
      <el-switch v-model="hta" inactive-text="取词翻译开关" @change="onHtaChange"></el-switch>
    </div>
  </div>
</template>
<script>
const BingConfig = {
  enable: true,
  hta: true
}
const backgroundPage = chrome.extension && chrome.extension.getBackgroundPage()
export default {
  name: 'BingConfig',
  beforeMount() {
    backgroundPage.findConfig.call(this, { Bing: BingConfig })
  },
  data() {
    return {
      ...BingConfig
    }
  },
  methods: {
    onConfigChange(enable) {
      BingConfig.enable = enable
      backgroundPage.saveConfig.call(this, { Bing: { ...BingConfig } })
    },
    onHtaChange(enable) {
      BingConfig.hta = enable
      backgroundPage.saveConfig.call(this, { Bing: { ...BingConfig } })
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
