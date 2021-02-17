<template>
  <div class="popup-page-wrapper">
    <el-switch v-model="enable" inactive-text="Douyu配置开关" @change="onSwitchChange"></el-switch>
    <div class="options-wrapper" v-if="enable">
      <el-divider class="narrow-divider"></el-divider>
      <el-switch v-model="fullPage" inactive-text="直播间网页全屏" @change="onFullPageChange"></el-switch>
      <div class="padding-10">
        <span class="font-size-14">弹幕字体大小 (当前{{ danmuSize }}px)</span>
        <el-slider
            v-model="danmuSize"
            :step="sizeStep"
            :min="minSize"
            :max="maxSize"
            @change="onSliderChange"
        ></el-slider>
      </div>
    </div>
  </div>
</template>
<script>
const DouyuConfig = {
  enable: true,
  fullPage: true,
  danmuSize: 30
}
const backgroundPage = chrome.extension && chrome.extension.getBackgroundPage()
export default {
  name: 'DouyuConfig',
  beforeMount() {
    backgroundPage.findConfig.call(this, { Douyu: DouyuConfig })
  },
  data() {
    return {
      ...DouyuConfig,
      sizeStep: 2,
      minSize: 16,
      maxSize: 48
    }
  },
  methods: {
    onSwitchChange(enable) {
      DouyuConfig.enable = enable
      backgroundPage.saveConfig.call(this, { Douyu: { ...DouyuConfig } })
    },
    onFullPageChange(fullPage) {
      DouyuConfig.fullPage = fullPage
      backgroundPage.saveConfig.call(this, { Douyu: { ...DouyuConfig } })
    },
    onSliderChange(size) {
      DouyuConfig.danmuSize = size
      backgroundPage.saveConfig.call(this, { Douyu: { ...DouyuConfig } })
    }
  }
}
</script>
<style scoped>
.popup-page-wrapper {
  width: 256px;
}

.font-size-14 {
  font-size: 14px;
}

.padding-10 {
  padding: 10px;
}
</style>
