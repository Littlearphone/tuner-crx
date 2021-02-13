<template>
  <div class="popup-page-wrapper">
    <el-switch v-model="enable" inactive-text="Bilibili配置开关" @change="onSwitchChange"></el-switch>
    <div class="options-wrapper" v-if="enable">
      <el-divider class="narrow-divider"></el-divider>
      <div class="padding-10">
        <span class="font-size-14">播放倍速 (当前{{ speedRate }}x)</span>
        <el-slider
            v-model="speedRate"
            :step="speedStep"
            :min="minSpeed"
            :max="maxSpeed"
            @change="onSliderChange"
        ></el-slider>
      </div>
    </div>
  </div>
</template>
<script>
const BilibiliConfig = {
  enable: true,
  speedRate: 1.25
}
const backgroundPage = chrome.extension && chrome.extension.getBackgroundPage()
export default {
  name: 'BilibiliConfig',
  beforeMount() {
    backgroundPage.getConfig.call(this, { Bilibili: BilibiliConfig })
  },
  data() {
    return {
      ...BilibiliConfig,
      speedStep: 0.05,
      minSpeed: 0.25,
      maxSpeed: 2.00
    }
  },
  methods: {
    onSwitchChange(enable) {
      BilibiliConfig.enable = enable
      backgroundPage.saveConfig.call(this, { Bilibili: { ...BilibiliConfig } })
    },
    onSliderChange(speed) {
      BilibiliConfig.speedRate = speed
      backgroundPage.saveConfig.call(this, { Bilibili: { ...BilibiliConfig } })
    }
  }
}
</script>
<style scoped>
.padding-10 {
  padding: 10px;
}

.font-size-14 {
  font-size: 14px;
}

.popup-page-wrapper {
  width: 256px;
}
</style>
