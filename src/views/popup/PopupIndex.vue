<template>
  <component v-bind:is="whichOne"></component>
</template>
<script>
import Empty from '../../component/EmptyConfig.vue'
import Baidu from '../../component/BaiduConfig.vue'
import Bilibili from '../../component/BilibiliConfig.vue'

const backgroundPage = chrome.extension && chrome.extension.getBackgroundPage()
export default {
  name: 'PopupIndex',
  components: {
    Empty,
    Baidu,
    Bilibili
  },
  beforeMount() {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      const tab = tabs.pop()
      if (!tab) {
        return
      }
      if (!backgroundPage || !backgroundPage.SiteMappings) {
        return
      }
      const site = backgroundPage.SiteMappings.find(mapping => mapping.expect(tab))
      this.whichOne = (site && site.panelName) || 'Empty'
    })
  },
  data() {
    return {
      whichOne: 'Empty'
    }
  }
}
</script>
<style scoped>
</style>
