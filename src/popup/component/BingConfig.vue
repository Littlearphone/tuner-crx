<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" active-text="Bing配置开关" @change="onConfigChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable">
      <el-switch v-model="hta" active-text="取词翻译开关" @change="onHtaChange"></el-switch>
      <el-switch v-model="autoPaging" active-text="自动分页开关" @change="onAutoPagingChange"></el-switch>
    </el-card>
  </div>
</template>
<script>
import { findConfig, saveConfig } from '../../background/common/support'

const BingConfig = {
  hta: true,
  enable: true,
  autoPaging: true
}
export default {
  name: 'BingConfig',
  beforeMount() {
    findConfig.call(this, { BingConfig })
  },
  data() {
    return {
      ...BingConfig
    }
  },
  methods: {
    onConfigChange(enable) {
      BingConfig.enable = enable
      saveConfig.call(this, { BingConfig })
    },
    onHtaChange(enable) {
      BingConfig.hta = enable
      saveConfig.call(this, { BingConfig })
    },
    onAutoPagingChange(enable) {
      BingConfig.autoPaging = enable
      saveConfig.call(this, { BingConfig })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
/*.popup-page-wrapper {*/
/*  width: 400px;*/
/*  height: 300px;*/
/*}*/
</style>
