<template>
  <component v-bind:is="whichOne"></component>
</template>
<script>
import { getRequest } from '../util/http'
import { siteMappings } from '../../background/common/options.js'

const files = import.meta.globEager("../component/*.vue")
const components = Object.keys(files).reduce((previous, current) => {
  const start = current.lastIndexOf('/') + 1
  const end = current.lastIndexOf('.')
  const name = current.substring(start, end)
  previous[name] = files[current].default || files[current]
  return previous
}, {})
export default {
  name: 'PopupIndex',
  components,
  beforeMount() {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      const tab = tabs.pop()
      if (!tab) {
        return
      }
      const site = siteMappings.find(mapping => mapping.expect(tab))
      this.whichOne = (site && site.panelName) || 'EmptyConfig'
    })
    getRequest('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function(response) {
      const images = JSON.parse(response).images
      document.body.style.backgroundImage = images.map(image => `url('http://cn.bing.com${image.url}')`).join(',')
    })
  },
  data() {
    return {
      whichOne: 'EmptyConfig'
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

    .el-card__body {
        padding: 8px;

        .el-switch {
            width: 100%;
            flex-direction: row-reverse;
            justify-content: space-between;

            .el-switch__label {
                margin-left: 0;
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
