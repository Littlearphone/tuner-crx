<template>
  <el-config-provider namespace="ep">
    <h3 class="empty-content" v-if="store.empty">当前页面无可配置项</h3>
    <popup-config v-else />
  </el-config-provider>
</template>
<script setup lang="ts">
import {onBeforeMount} from 'vue'
import {getRequest} from './util/http'
import PopupConfig from './view/PopupConfig.vue'
import {usePopupConfigStore} from '~/stores/popup-config'
import {ActiveTab, HackMappings} from '~/common/constant'

const store = usePopupConfigStore();
chrome.tabs && chrome.tabs.query(ActiveTab).then(([tab]) => {
  const site = HackMappings.find(mapping => mapping.expectUrl(tab))
  if (site) {
    store.enableConfig()
    store.mergeConfig(site)
  }
})
onBeforeMount(() => {
  getRequest('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', (response: any) => {
    const images = JSON.parse(response).images
    document.body.style.backgroundImage = images.map((image: any) => `url('http://cn.bing.com${image.url}')`).join(',')
  })
})
</script>
<style lang="scss">
body {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

#app {
  margin: 8px 12px;
  backdrop-filter: blur(4px);

  .empty-content {
    padding: 10px;
    color: #dfdfdf;
    text-align: center;
    border-radius: 5px;
    text-shadow: 0 0 10px white;
  }
}

.narrow-divider {
  margin: 0;
}

.popup-page-wrapper {
  width: 300px;
  display: flex;
  user-select: none;
  flex-direction: column;

  .config-switch-card {
    margin-bottom: 4px;
  }

  .ep-switch {
    padding: 4px 0;
  }

  .ep-card {
    border: transparent;
    //backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, .4);
    //background-color: rgba(255, 255, 255, .7);

    .ep-card__body {
      padding: 8px;

      .ep-switch {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;

        .ep-switch__label {
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

    .ep-card__body {
      display: flex;
      flex-direction: column;

    }

    .ep-divider--horizontal {
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
