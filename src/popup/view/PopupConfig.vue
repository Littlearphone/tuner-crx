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
      ></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="store.description.enable && store.description.fields.length">
      <component
        :config="field"
        :is="field.type"
        :key="field.key"
        @store-config="store.saveDescription"
        v-for="field in store.description.fields"
      ></component>
      <!--<el-switch v-model="autoPaging" active-text="自动分页开关" @change="onAutoPagingChange"></el-switch>-->
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue"
import {getStorage} from '~/common/support'
import {DefaultConfig} from '~/common/constant'
import {usePopupConfigStore} from "~/stores/popup-config"

const store = usePopupConfigStore()
const config = ref({...DefaultConfig})

function loadConfig(configId: string = '', configLabel: string) {
  getStorage(configId).then((configs: any) => {
    store.mergeConfig({
      description: {
        ...configs[configId],
        configId: configId,
        configLabel: configLabel
      }
    })
  })
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
  loadConfig(store.description.configId, store.description.configLabel)
})
</script>
<style lang="scss">
h3 {
  width: 170px;
}
</style>
