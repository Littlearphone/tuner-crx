<template>
  <div @contextmenu="showContextMenu">
    <div class="contextmenu-layer" v-show="contextMenuVisible" @click="hideContextMenu">
      <div class="contextmenu-block" :style="contextMenuStyle">
        <div v-for="item in contextMenus" @click="item.action" class="contextmenu-item">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span class="contextmenu-text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="background-layer" :style="backgroundLayerStyle"></div>
    <div class="effect-layer" :style="effectLayerStyle"></div>
    <div class="app-layer"></div>
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

export default {
  name: 'App',
  components: { setting },
  data() {
    return {
      activeName: '1',
      dialogVisible: false,
      contextMenuVisible: false,
      contextMenuStyle: {
        top: 0,
        left: 0
      },
      contextMenus: [
        { icon: 'setting', name: '设置', action: this.showConfigPanel.bind(this) },
        { name: '测试', action: this.testActionMethod.bind(this) }
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
    disableContextMenu(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    testActionMethod() {},
    showConfigPanel() {
      this.dialogVisible = true
    },
    hideContextMenu(e) {
      e.preventDefault()
      this.contextMenuVisible = false
    },
    showContextMenu(e) {
      e.preventDefault()
      this.contextMenuStyle.top = `${e.clientY}px`
      this.contextMenuStyle.left = `${e.clientX}px`
      this.contextMenuVisible = true
    }
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
.effect-layer,
.app-layer {
  width: 100%;
  height: 100%;
}

.contextmenu-layer {
  position: fixed;
  z-index: 999999;

  .contextmenu-block {
    width: auto;
    height: auto;
    color: #d9ecff;
    z-index: 999999;
    position: fixed;
    user-select: none;
    font-weight: bold;
    background-color: rgba(255, 255, 255, .3);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .3);

    .contextmenu-item {
      display: flex;
      cursor: pointer;
      font-size: 12px;
      padding: 4px 16px;
      align-items: center;

      .contextmenu-text {
        padding: 0 4px;
      }

      &:hover {
        color: #2196f3;
        background-color: #dfdfdf;
      }
    }
  }
}

.background-layer {
  position: fixed;
  background-size: cover;
  background-position: center;
}

.effect-layer {
  position: fixed;
  transition: all 300ms;
  backdrop-filter: blur(0);
}

.app-layer {
}
</style>
