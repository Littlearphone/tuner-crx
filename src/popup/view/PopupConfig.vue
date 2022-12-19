<template>
  <div class="popup-page-wrapper">
    <el-card class="config-switch-card">
      <el-switch v-model="enable" :active-text="configLabel" @change="onEnableSwitchChange"></el-switch>
      <el-switch v-model="enableCss" active-text="注入预设样式" @change="onCssSwitchChange"></el-switch>
      <el-switch v-model="enableScript" active-text="注入预设脚本" @change="onScriptSwitchChange"></el-switch>
    </el-card>
    <el-card class="options-wrapper" v-if="enable && fields.length">
      <component
          v-for="field in fields"
          :key="field.key"
          v-bind:is="field.type"
          :config="field"
          @store-config="storePopupConfig"
      ></component>
      <!--<el-switch v-model="autoPaging" active-text="自动分页开关" @change="onAutoPagingChange"></el-switch>-->
    </el-card>
  </div>
</template>
<script>
import { DefaultConfig, HackMappings } from '../../background/common/constant'
import { chromeStorage } from '../../background/common/support'

const files = import.meta.glob("../component/*.vue", { eager: true })
const components = Object.keys(files).reduce((previous, current) => {
  const start = current.lastIndexOf('/') + 1
  const end = current.lastIndexOf('.')
  const name = current.substring(start, end)
  previous[name] = files[current].default || files[current]
  return previous
}, {})
export default {
  name: 'PopupConfig',
  components,
  props: {
    description: {
      type: Object,
      default: DefaultConfig
    }
  },
  watch: {
    description: {
      deep: true,
      immediate: true,
      handler(value) {
        chromeStorage(value.configId, configs => {
          this.configLabel = value.configLabel
          const config = configs[value.configId] || {}
          this.enable = config.hasOwnProperty('enable') ? config.enable : true
          this.injectCss = config.hasOwnProperty('injectCss') ? config.injectCss : true
          this.injectScript = config.hasOwnProperty('injectScript') ? config.injectScript : true
          const fields = [];
          (value.fields || []).map(field => ({ ...field })).forEach(field => {
            if (!field.hasOwnProperty('value')) {
              field.value = field.default
            }
            if (config.hasOwnProperty(field.key)) {
              field.value = config[field.key]
            }
            fields.push(field)
          })
          this.fields = fields
          console.log(JSON.stringify(config))
        })
      }
    }
  },
  computed: {
    enableCss() {
      return this.enable && this.injectCss
    },
    enableScript() {
      return this.enable && this.injectScript
    }
  },
  data() {
    // const id = this.description.configId
    // if (!id || !chrome.storage || !chrome.storage.local) {
    //   return {}
    // }
    // chrome.storage.local.get([id], config => {
    //   console.log(this.description.configLabel)
    //   console.log(JSON.stringify(config))
    // })
    const mapping = HackMappings.find(mapping => mapping.id === this.description.configId)
    const fields = (mapping && mapping.configDescription.fields) || []
    fields.forEach(field => (field.value = field.default))
    return {
      enable: true,
      injectCss: true,
      injectScript: true,
      configLabel: '',
      fields: fields || []
    }
  },
  methods: {
    onEnableSwitchChange(value) {
      this.storePopupConfig({ enable: value })
    },
    onCssSwitchChange(value) {
      this.injectCss = value
      this.storePopupConfig({ injectCss: value })
    },
    onScriptSwitchChange(value) {
      this.injectScript = value
      this.storePopupConfig({ injectScript: value })
    },
    storePopupConfig(data) {
      const fieldsMap = {}
      if (data.fields) {
        data.fields.forEach(field => {fieldsMap[field.key] = field.value})
      }
      const configId = this.description.configId
      chromeStorage(configId, configs => {
        const merged = configs && configs[configId] || {}
        merged.enable = data.enable || this.enable
        merged.injectCss = data.injectCss || this.injectCss
        merged.injectScript = data.injectScript || this.injectScript
        Object.keys(fieldsMap).forEach(key => {
          merged[key] = fieldsMap[key]
        })
        chromeStorage({ [configId]: merged })
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
h3 {
  width: 170px;
}
</style>
