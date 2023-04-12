<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch
        @change="onEnableSwitchChange"
        v-model="store.description.enable"
        :active-text="store.description.configLabel"
      ></el-switch>
      <el-switch
        active-text="注入预设样式"
        @change="onCssSwitchChange"
        v-if="store.description.enable"
        v-model="store.description.injectCSS"
      ></el-switch>
      <el-switch
        active-text="注入预设脚本"
        @change="onScriptSwitchChange"
        v-if="store.description.enable"
        v-model="store.description.injectScript"
      />
    </el-card>
    <el-card class="options-wrapper" v-if="store.description.enable && store.description.fields.length">
      <component :config="field" :is="field.type" :key="field.key" v-for="field in store.description.fields" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getStorage} from '~/common/support'
import {DefaultConfig} from '~/common/constant'
import {usePopupConfigStore} from '~/stores/popup-config'

const store = usePopupConfigStore()
const config = ref({...DefaultConfig})

function loadConfig(configLabel: string, configId: string = '') {
  getStorage(configId).then((configs: any) => {
    store.mergeConfig({
      description: {
        ...configs[configId],
        configId: configId,
        configLabel: configLabel
      }
    })
  })
  // const configs: any = {
  //   enable: true,
  //   injectCSS: true,
  //   autoPaging: true,
  //   injectScript: true,
  //   configId: 'baidu-search',
  //   configLabel: '"搜索"配置开关',
  //   fields: [
  //     {
  //       key: 'autoPaging',
  //       label: '自动翻页',
  //       type: 'SwitchField',
  //     },
  //     {
  //       key: 'testSlider',
  //       label: '测试滑动组件',
  //       type: 'SliderField',
  //     },
  //     {
  //       key: 'backgroundImage',
  //       label: '背景图片',
  //       type: 'UploadField',
  //     }
  //   ]
  // }
  // store.mergeConfig({
  //   description: {
  //     ...configs,
  //   }
  // })
}

function onEnableSwitchChange(value: boolean) {
  store.saveDescription({enable: value})
}

function onCssSwitchChange(value: boolean) {
  store.saveDescription({injectCSS: value})
}

function onScriptSwitchChange(value: boolean) {
  store.saveDescription({injectScript: value})
}

onMounted(() => {
  loadConfig(store.description.configLabel, store.description.configId)
})
</script>
<style lang="scss">
h3 {
    width: 170px;
}
</style>
