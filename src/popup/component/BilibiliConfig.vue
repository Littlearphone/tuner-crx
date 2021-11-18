<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" active-text="Bilibili配置开关" @change="onEnableSwitchChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable">
      <el-switch v-model="autoPlaySwitch" active-text="视频自动播放" @change="onAutoPlaySwitchChange"></el-switch>
      <el-switch v-model="videoJumpSwitch" active-text="进度自动跳转" @change="onVideoJumpSwitchChange"></el-switch>
      <el-switch v-model="fullWebScreenSwitch" active-text="网页自动全屏" @change="onFullscreenSwitchChange"></el-switch>
      <el-divider></el-divider>
      <div>
        <span class="option-slider-label">播放倍速 (当前{{ speedRate }}x)</span>
        <el-slider
            v-model="speedRate"
            :step="speedStep"
            :min="minSpeed"
            :max="maxSpeed"
            @change="onSliderChange"
        ></el-slider>
      </div>
    </el-card>
  </div>
</template>
<script>
import { findConfig, saveConfig } from '../../background/common/support'

const BilibiliConfig = {
  enable: true,
  speedRate: 1.25,
  autoPlaySwitch: true,
  videoJumpSwitch: true,
  fullWebScreenSwitch: true
}
export default {
  name: 'BilibiliConfig',
  beforeMount() {
    findConfig.call(this, { BilibiliConfig })
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
    onEnableSwitchChange(enable) {
      BilibiliConfig.enable = enable
      saveConfig.call(this, { BilibiliConfig })
    },
    onFullscreenSwitchChange(enable) {
      BilibiliConfig.fullWebScreenSwitch = enable
      saveConfig.call(this, { BilibiliConfig })
    },
    onVideoJumpSwitchChange(enable) {
      BilibiliConfig.videoJumpSwitch = enable
      saveConfig.call(this, { BilibiliConfig })
    },
    onAutoPlaySwitchChange(enable) {
      BilibiliConfig.autoPlaySwitch = enable
      saveConfig.call(this, { BilibiliConfig })
    },
    onSliderChange(speed) {
      BilibiliConfig.speedRate = speed
      saveConfig.call(this, { BilibiliConfig })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
</style>
