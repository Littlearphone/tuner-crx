<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" active-text="Douyu配置开关" @change="onSwitchChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable">
      <el-switch v-model="fullPage" active-text="直播间网页全屏" @change="onFullPageChange"></el-switch>
      <el-divider></el-divider>
      <div>
        <span class="option-slider-label">弹幕字体大小 (当前{{ danmuSize }}px)</span>
        <el-slider
            v-model="danmuSize"
            :step="sizeStep"
            :min="minSize"
            :max="maxSize"
            @change="onSliderChange"
        ></el-slider>
      </div>
    </el-card>
  </div>
</template>
<script>
import { findConfig, saveConfig } from '../../background/common/support'

const DouyuLive = {
  enable: true,
  fullPage: true,
  danmuSize: 30
}
export default {
  name: 'DouyuLive',
  beforeMount() {
    findConfig.call(this, { DouyuLive })
  },
  data() {
    return {
      ...DouyuLive,
      sizeStep: 2,
      minSize: 16,
      maxSize: 48
    }
  },
  methods: {
    onSwitchChange(enable) {
      DouyuLive.enable = enable
      saveConfig.call(this, { DouyuLive })
    },
    onFullPageChange(fullPage) {
      DouyuLive.fullPage = fullPage
      saveConfig.call(this, { DouyuLive })
    },
    onSliderChange(size) {
      DouyuLive.danmuSize = size
      saveConfig.call(this, { DouyuLive })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
</style>
