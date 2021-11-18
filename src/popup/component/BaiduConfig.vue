<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" active-text="Baidu净化开关" @change="onSwitchChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable">
      <el-switch v-model="autoPaging" active-text="自动分页开关" @change="onAutoPagingChange"></el-switch>
      <!--<el-divider></el-divider>-->
      <!--<div>-->
      <!--  <span class="option-slider-label">弹幕字体大小 (当前{{ danmuSize }}px)</span>-->
      <!--  <el-slider-->
      <!--      v-model="danmuSize"-->
      <!--      :step="sizeStep"-->
      <!--      :min="minSize"-->
      <!--      :max="maxSize"-->
      <!--      @change="onSliderChange"-->
      <!--  ></el-slider>-->
      <!--</div>-->
    </el-card>
  </div>
</template>
<script>
import { findConfig, saveConfig } from '../../background/common/support'

const BaiduConfig = {
  enable: true,
  autoPaging: true
}
export default {
  name: 'BaiduConfig',
  beforeMount() {
    findConfig.call(this, { BaiduConfig })
  },
  data() {
    return {
      ...BaiduConfig
    }
  },
  methods: {
    onSwitchChange(enable) {
      BaiduConfig.enable = enable
      saveConfig.call(this, { BaiduConfig })
    },
    onAutoPagingChange(enable) {
      BaiduConfig.autoPaging = enable
      saveConfig.call(this, { BaiduConfig })
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
