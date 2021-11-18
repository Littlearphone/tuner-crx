<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" active-text="Google美化开关" @change="onSwitchChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable">
      <el-switch v-model="autoPaging" active-text="自动分页开关" @change="onAutoPagingChange"></el-switch>
    </el-card>
  </div>
</template>
<script>
import { findConfig, saveConfig } from '../../background/common/support'

const GoogleConfig = {
  enable: true,
  autoPaging: true
}
export default {
  name: 'GoogleConfig',
  beforeMount() {
    findConfig.call(this, { GoogleConfig: GoogleConfig })
  },
  data() {
    return {
      ...GoogleConfig
    }
  },
  methods: {
    onSwitchChange(enable) {
      GoogleConfig.enable = enable
      saveConfig.call(this, { GoogleConfig: GoogleConfig })
    },
    onAutoPagingChange(enable) {
      GoogleConfig.autoPaging = enable
      saveConfig.call(this, { GoogleConfig: GoogleConfig })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
.el-card.is-always-shadow {
  background-color: rgba(255, 255, 255, .6);
  border-color: transparent;
}

//.options-wrapper {
//    height: 200px;
//}
</style>
