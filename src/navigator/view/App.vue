<template>
  <div @contextmenu="showGlobalMenus">
    <div class="background-layer" :style="backgroundLayerStyle"></div>
    <div class="effect-layer" :style="effectLayerStyle"></div>
    <div class="app-layer">
      <el-scrollbar>
        <div ref="appContainer" class="app-container" :style="containerStyle">
          <div
              class="app-block"
              v-for="app in apps"
              :style="appBlockStyle(app)"
              @click="e => clickAppBlock(app, e)"
              @contextmenu="disableContextMenu"
          >
            <div class="app-head" v-if="appHeadText(app)" :style="appHeadStyle(app)">
              {{ appHeadText(app) }}
            </div>
            <div class="app-body" v-if="appBodyText(app)" :style="appBodyStyle(app)">
              {{ appBodyText(app) }}
            </div>
            <div class="app-tail" v-if="appTailText(app)" :style="appTailStyle(app)">
              {{ appTailText(app) }}
            </div>
          </div>
        </div>
      </el-scrollbar>
      <div class="contextmenu-block" :style="contextMenuStyle" v-show="contextMenuVisible">
        <div v-for="item in contextMenus" @click="clickContextMenuItem(item.action)" class="contextmenu-item">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span class="contextmenu-text">{{ item.name }}</span>
        </div>
      </div>
      <!--<div class="contextmenu-layer" @click="hideContextMenu">-->
      <!--</div>-->
    </div>
    <div class="app-dialog" @contextmenu="disableContextMenu">
      <el-dialog v-model="appDialogVisible" destroy-on-close :fullscreen="appDialogFullscreen">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Consistency" name="1">
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2">
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="3">
          </el-collapse-item>
          <el-collapse-item title="Controllability" name="4">
          </el-collapse-item>
        </el-collapse>
      </el-dialog>
    </div>
    <div class="config-panel" @contextmenu="disableContextMenu">
      <el-dialog v-model="configPanelVisible" destroy-on-close>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="组件图标设置" name="1">
            <el-card>
              <div class="config-item">
                <span class="config-item-text">组件图标间距</span>
                <el-slider class="config-item-element" v-model="containerProperties.gapLength" show-input></el-slider>
              </div>
              <div class="config-item">
                <span class="config-item-text">组件图标大小</span>
                <el-slider
                    :min="64"
                    :max="128"
                    show-input
                    class="config-item-element"
                    v-model="containerProperties.unitLength"
                ></el-slider>
              </div>
              <div class="config-item">
                <span class="config-item-text">组件图标圆角</span>
                <el-slider
                    :min="0"
                    :max="64"
                    show-input
                    class="config-item-element"
                    v-model="containerProperties.unitRadius"
                ></el-slider>
              </div>
            </el-card>
          </el-collapse-item>
          <el-collapse-item title="组件交互设置" name="2">
            <el-card>
              <div class="config-item">
                <el-switch v-model="appLinkOpenWindow" size="large" inactive-text="链接在新窗口打开" />
              </div>
              <div class="config-item">
                <el-switch v-model="appDialogFullscreen" size="large" inactive-text="小组件全屏" />
              </div>
            </el-card>
          </el-collapse-item>
          <el-collapse-item title="主题设置" name="3">
            <el-card></el-card>
          </el-collapse-item>
          <el-collapse-item title="其它设置" name="4">
            <el-card></el-card>
          </el-collapse-item>
        </el-collapse>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import setting from '@element-plus/icons-vue/dist/es/setting.mjs'
import dataLine from '@element-plus/icons-vue/dist/es/data-line.mjs'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { APP_BLOCKS, BACKGROUND } from './config/data'

export default {
  name: 'App',
  components: {
    setting,
    dataLine
  },
  mounted() {
    this.refreshClock()
    Array.from(document.styleSheets).forEach((sheet, index) => {
      const fadeInIndex = Array.from(sheet.cssRules).findIndex(rule => rule.name === 'dialog-fade-in')
      const fadeOutIndex = Array.from(sheet.cssRules).findIndex(rule => rule.name === 'dialog-fade-out')
      if (fadeInIndex < 0 || fadeOutIndex < 0) {
        return
      }
      this.fadeSheetIndex = index
      this.fadeInIndex = fadeInIndex
      this.fadeOutIndex = fadeOutIndex
    })
  },
  computed: {
    containerStyle() {
      const gapLength = this.containerProperties.gapLength
      const unitLength = this.containerProperties.unitLength
      return {
        rowGap: `${gapLength}px`,
        columnGap: `${gapLength}px`,
        'grid-template-rows': `repeat(auto-fill, ${unitLength}px)`,
        'grid-template-columns': `repeat(auto-fill, ${unitLength}px)`
      }
    }
  },
  data() {
    return {
      fadeInIndex: -1,
      fadeOutIndex: -1,
      fadeSheetIndex: -1,
      apps: APP_BLOCKS,
      activeName: '1',
      containerProperties: {
        gapLength: 16,
        unitRadius: 0,
        unitLength: 64
      },
      appDialogVisible: false,
      appLinkOpenWindow: true,
      appDialogFullscreen: true,
      configPanelVisible: false,
      contextMenuVisible: false,
      contextMenuStyle: {
        top: 0,
        left: 0
      },
      globalMenus: [
        {
          icon: 'setting',
          name: '设置',
          action: this.showConfigPanel.bind(this)
        },
        {
          icon: 'dataLine',
          name: '测试',
          action: this.testActionMethod.bind(this)
        }
      ],
      blockMenus: [{
        icon: 'setting',
        name: '设置',
        action: this.showConfigPanel.bind(this)
      }],
      contextMenus: [],
      backgroundLayerStyle: {
        backgroundImage: `url(${BACKGROUND})`
      },
      effectLayerStyle: {
        backdropFilter: `blur(1rem)`
      }
    }
  },
  methods: {
    refreshClock() {
      const clocks = this.apps.filter(app => app.type === 'clock')
      clocks.forEach(app => {
        if (app.head && app.head.text) {
          app.head.text = moment().format('HH:mm:ss')
        } else {
          app.head = moment().format('HH:mm:ss')
        }
        if (app.body && app.body.text) {
          app.body.text = moment().format('YYYY-MM-DD')
        } else {
          app.body = moment().format('YYYY-MM-DD')
        }
        if (app.tail && app.tail.text) {
          app.tail.text = moment().format('dddd')
        } else {
          app.tail = moment().format('dddd')
        }
      })
      if (clocks.length) {
        setTimeout(() => this.refreshClock(), 1000)
      }
    },
    appHeadText(app) {
      return (app.head && app.head.text) || app.head
    },
    appHeadStyle(app) {
      return app.head && app.head.style
    },
    appBodyText(app) {
      return (app.body && app.body.text) || app.body
    },
    appBodyStyle(app) {
      return app.body && app.body.style
    },
    appTailText(app) {
      return (app.tail && app.tail.text) || app.tail
    },
    appTailStyle(app) {
      return app.tail && app.tail.style
    },
    appBlockStyle(app) {
      const rowGap = this.containerProperties.gapLength
      const columnGap = this.containerProperties.gapLength
      const unitWidth = this.containerProperties.unitLength
      const unitHeight = this.containerProperties.unitLength
      const unitRadius = this.containerProperties.unitRadius
      const row = Math.min(Math.abs(app.row || 1), 4)
      const column = Math.min(Math.abs(app.column || 1), 4)
      return Object.assign(app.style || {}, {
        gridRow: `span ${row}`,
        'border-radius': `${unitRadius}px`,
        gridColumn: app.column < 0 ? `1/-1` : `span ${column}`,
        height: `${(row - 1) * rowGap + row * unitHeight}px`,
        width: `${(column - 1) * columnGap + column * unitWidth}px`
      })
    },
    clickAppBlock(app, e) {
      e && e.preventDefault()
      e && e.stopPropagation()
      switch (app.type || 'dialog') {
        case'link':
          if (app.link) {
            this.appLinkOpenWindow ? window.open(app.link) : (window.location = app.link)
          }
          break
        case 'dialog' :
          const target = e && e.currentTarget
          if (!target) {
            return
          }
          this.updateDialogAnimation(target)
          this.appDialogVisible = true
          break
        default:
          break
      }
    },
    updateDialogAnimation(target) {
      if (this.fadeSheetIndex < 0) {
        return
      }
      const style = window.getComputedStyle(target)
      const width = parseFloat(style.width)
      const height = parseFloat(style.height)
      const offsetTop = parseFloat(target.offsetTop) + height / 2
      const offsetLeft = parseFloat(target.offsetLeft) + width / 2
      const styleSheet = document.styleSheets[this.fadeSheetIndex]
      styleSheet.deleteRule(this.fadeInIndex)
      styleSheet.insertRule(`
      @keyframes dialog-fade-in {
        0% {
          opacity: .3;
          transform: scale(.5);
          transform-origin: ${offsetLeft}px ${offsetTop}px;
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      `, this.fadeInIndex)
      styleSheet.deleteRule(this.fadeOutIndex)
      styleSheet.insertRule(`
      @keyframes dialog-fade-out {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: .3;
          transform: scale(.5);
          transform-origin: ${offsetLeft}px ${offsetTop}px;
        }
      }
      `, this.fadeOutIndex)
    },
    disableContextMenu(e) {
      e && e.preventDefault()
      e && e.stopPropagation()
    },
    testActionMethod() {},
    showConfigPanel() {
      this.configPanelVisible = true
    },
    clickContextMenuItem(callback) {
      callback.call(this)
      this.hideContextMenu()
    },
    hideContextMenu(e) {
      e && e.preventDefault()
      e && e.stopPropagation()
      this.contextMenuVisible = false
      document.removeEventListener('click', this.hideContextMenu)
    },
    showBlockMenus(e) {
      this.showContextMenus(e, this.blockMenus)
    },
    showGlobalMenus(e) {
      this.showContextMenus(e, this.globalMenus)
    },
    showContextMenus(e, menus) {
      e && e.preventDefault()
      e && e.stopPropagation()
      this.contextMenus = menus
      this.contextMenuVisible = true
      this.contextMenuStyle.top = `${e.clientY}px`
      this.contextMenuStyle.left = `${e.clientX}px`
      document.addEventListener('click', this.hideContextMenu)
    }
  },
  destroyed() {
    document.removeEventListener('click', this.hideContextMenu)
  }
}
</script>
<style lang="scss">
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.config-panel {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;

    .el-collapse-item__content {
      padding-bottom: 12px;
    }

    .config-item {
      display: flex;
      min-height: 38px;

      .config-item-text {
        width: 100px;
        font-size: 14px;
        text-align: left;
        line-height: 38px;
      }

      .config-item-element {
        width: calc(100% - 100px);
      }

      .el-switch {
        width: 100%;
        align-self: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.contextmenu-layer,
.background-layer,
.effect-layer {
  width: 100%;
  height: 100%;
}

.contextmenu-block {
  width: auto;
  height: auto;
  z-index: 1300;
  color: #d9ecff;
  position: fixed;
  user-select: none;
  font-weight: bold;
  background-color: rgba(255, 255, 255, .3);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .3);

  .contextmenu-item {
    display: flex;
    cursor: pointer;
    font-size: 12px;
    padding: 4px 12px;
    align-items: center;

    .contextmenu-text {
      padding: 0 8px;
    }

    &:hover {
      color: #2196f3;
      background-color: #dfdfdf;
    }
  }
}

.background-layer {
  z-index: 1100;
  position: fixed;
  background-size: cover;
  background-position: center;
}

.effect-layer {
  z-index: 1200;
  position: fixed;
  transition: all 300ms;
  backdrop-filter: blur(0);
}

.app-layer {
  z-index: 1300;
  padding: 16px;
  position: fixed;
  width: calc(100% - 32px);
  height: calc(100% - 32px);

  .app-container {
    display: grid;
    justify-items: center;
    justify-content: center;

    .app-block {
      width: 64px;
      height: 64px;
      overflow: hidden;
      user-select: none;
      transform: scale(1);
      display: inline-flex;
      flex-direction: column;
      transition: transform 200ms;
      justify-content: space-evenly;
      background-color: rgba(255, 255, 255, .3);

      &:active {
        transform: scale(.95);
      }

      &:hover {
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .5);
      }

      & > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
