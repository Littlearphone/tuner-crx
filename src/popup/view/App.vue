<template>
  <h3 class="empty-content" v-if="empty">当前页面无可配置项</h3>
  <popup-config :description="configDescription" v-else></popup-config>
</template>
<script>
import { getRequest } from '../util/http'
import { ActiveTab, DefaultConfig, HackMappings } from '../../background/common/constant.js'
import PopupConfig from './PopupConfig.vue'
// const files = import.meta.globEager("../component/*.vue")
// const components = Object.keys(files).reduce((previous, current) => {
//   const start = current.lastIndexOf('/') + 1
//   const end = current.lastIndexOf('.')
//   const name = current.substring(start, end)
//   previous[name] = files[current].default || files[current]
//   return previous
// }, {})
const empty = import.meta.env.VITE_EMPTY_POPUP === 'true'
const config = {
  ...DefaultConfig,
  configId: import.meta.env.VITE_POPUP_ID
}
export default {
  name: 'PopupIndex',
  components: { PopupConfig },
  beforeMount() {
    getRequest('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function(response) {
      const images = JSON.parse(response).images
      document.body.style.backgroundImage = images.map(image => `url('http://cn.bing.com${image.url}')`).join(',')
    })
  },
  data() {
    chrome.tabs && chrome.tabs.query(ActiveTab).then(([tab]) => {
      const site = HackMappings.find(mapping => mapping.expectUrl(tab))
      if (site) {
        this.empty = false
        this.configDescription = Object.assign(config, { configId: site.id }, site.configDescription)
      }
    })
    return {
      empty,
      configDescription: config
    }
  }
}
</script>
<style lang="scss" type="text/scss">
body {
  background-size: 100%;
}

#app {
  backdrop-filter: blur(4px);

  .empty-content {
    color: black;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    text-shadow: 0 0 10px rgb(255 255 255 / 60%);
  }
}

.narrow-divider {
  margin: 0;
}

.popup-page-wrapper {
  width: 256px;
  display: flex;
  flex-direction: column;

  .config-switch-card {
    margin-bottom: 4px;
  }

  .el-switch {
    padding: 4px 0;
  }

  .el-card {
    border: transparent;
    //backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, .4);
    //background-color: rgba(255, 255, 255, .7);

    .el-card__body {
      padding: 8px;

      .el-switch {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;

        .el-switch__label {
          margin-left: 0;

          &.is-active {
            font-weight: bold;
          }

          &:not(.is-active) {
            color: #dfdfdf;
            text-shadow: 0 0 10px white;
          }
        }
      }
    }
  }

  .options-wrapper {

    .el-card__body {
      display: flex;
      flex-direction: column;

    }

    .el-divider--horizontal {
      margin: 4px 0;
    }

    .option-slider-label {
      font-size: 15px;
      padding-top: 8px;
      display: inline-block;
    }
  }
}
</style>
