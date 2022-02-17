<template>
  <div @contextmenu="showContextMenu">
    <div class="background-layer" :style="backgroundLayerStyle"></div>
    <div class="effect-layer" :style="effectLayerStyle"></div>
    <div class="app-layer">
      <div class="app-container">
        <div class="app-block" v-for="app in apps" :style="app.style || {}" @contextmenu="disableContextMenu">
          <div class="app-head" v-if="app.head.text || app.head" :style="app.head.style">
            {{ app.head.text || app.head }}
          </div>
          <div class="app-body" v-if="app.body.text || app.body" :style="app.body.style">
            {{ app.body.text || app.body }}
          </div>
          <div class="app-tail" v-if="app.tail.text || app.tail" :style="app.tail.style">
            {{ app.tail.text || app.tail }}
          </div>
        </div>
      </div>
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
    <div class="config-panel" @contextmenu="disableContextMenu">
      <el-dialog v-model="dialogVisible">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Consistency" name="1">
            <div>
              Consistent with real life: in line with the process and logic of real
              life, and comply with languages and habits that the users are used to;
            </div>
            <div>
              Consistent within interface: all elements should be consistent, such
              as: design style, icons and texts, position of elements, etc.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2">
            <div>
              Operation feedback: enable the users to clearly perceive their
              operations by style updates and interactive effects;
            </div>
            <div>
              Visual feedback: reflect current state by updating or rearranging
              elements of the page.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="3">
            <div>
              Simplify the process: keep operating process simple and intuitive;
            </div>
            <div>
              Definite and clear: enunciate your intentions clearly so that the
              users can quickly understand and make decisions;
            </div>
            <div>
              Easy to identify: the interface should be straightforward, which helps
              the users to identify and frees them from memorizing and recalling.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Controllability" name="4">
            <div>
              Decision making: giving advices about operations is acceptable, but do
              not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including canceling, aborting or terminating current
              operation.
            </div>
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

export default {
  name: 'App',
  components: {
    setting,
    dataLine
  },
  mounted() {
    this.refreshClock()
  },
  data() {
    return {
      apps: [{
        head: moment().format('HH:mm:ss'),
        body: {
          text: moment().format('YYYY-MM-DD'),
          style: {
            fontSize: '12px'
          }
        },
        tail: {
          text: moment().format('dddd'),
          style: {
            fontSize: '12px'
          }
        },
        type: 'clock',
        style: {
          backgroundColor: `white`
        }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: {
          text: moment().format('HH:mm:ss'),
          style: {
            fontSize: '32px'
          }
        },
        body: moment().format('YYYY-MM-DD'),
        tail: moment().format('dddd'),
        type: 'clock',
        style: {
          width: '144px',
          height: '144px',
          gridRow: `span 2`,
          gridColumn: `span 2`,
          backgroundColor: `white`
        }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: {
          text: moment().format('HH:mm:ss'),
          style: {
            fontSize: '64px'
          }
        },
        body: moment().format('YYYY-MM-DD'),
        tail: moment().format('dddd'),
        type: 'clock',
        style: {
          width: '304px',
          height: '144px',
          gridRow: `span 2`,
          gridColumn: `span 4`,
          backgroundColor: `white`
        }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: {
          width: '144px',
          height: '144px',
          gridRow: `span 2`,
          gridColumn: `span 2`,
          backgroundColor: `white`
        }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }, {
        head: 'head',
        body: 'body',
        tail: 'tail',
        style: { backgroundColor: `white` }
      }],
      activeName: '1',
      dialogVisible: false,
      contextMenuVisible: false,
      contextMenuStyle: {
        top: 0,
        left: 0
      },
      contextMenus: [
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
      backgroundLayerStyle: {
        backgroundImage: `url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1639402477084-7e98f693c98a?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDA4NjQwMTM&ixlib=rb-1.2.1&w=2560&fm=jpg')`
      },
      effectLayerStyle: {
        backdropFilter: `blur(1rem)`
      }
    }
  },
  methods: {
    refreshClock() {
      this.apps.filter(app => app.type === 'clock').forEach(app => {
        if (app.head.text) {
          app.head.text = moment().format('HH:mm:ss')
        } else {
          app.head = moment().format('HH:mm:ss')
        }
        if (app.body.text) {
          app.body.text = moment().format('YYYY-MM-DD')
        } else {
          app.body = moment().format('YYYY-MM-DD')
        }
        if (app.tail.text) {
          app.tail.text = moment().format('dddd')
        } else {
          app.tail = moment().format('dddd')
        }
      })
      setTimeout(() => this.refreshClock(), 1000)
    },
    disableContextMenu(e) {
      e && e.preventDefault()
      e && e.stopPropagation()
    },
    testActionMethod() {},
    showConfigPanel() {
      this.dialogVisible = true
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
    showContextMenu(e) {
      e && e.preventDefault()
      e && e.stopPropagation()
      this.contextMenuStyle.top = `${e.clientY}px`
      this.contextMenuStyle.left = `${e.clientX}px`
      this.contextMenuVisible = true
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
    row-gap: 16px;
    column-gap: 16px;
    justify-content: center;
    grid-template-rows: repeat(auto-fill, 64px);
    grid-template-columns: repeat(auto-fill, 64px);

    .app-block {
      width: 64px;
      height: 64px;
      display: inline-flex;
      flex-direction: column;
      justify-content: space-evenly;
      background-color: rgba(255, 255, 255, .3);

      & > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
