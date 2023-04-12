<template>
  <div class="ep-upload__wrapper">
    <span class="ep-upload__label">{{ config.label }}</span>
    <el-upload
      v-loading="loadImage"
      :on-error="() => {}"
      :on-success="() => {}"
      :show-file-list="false"
      list-type="picture-card"
      action="#import-background-image"
      :before-upload="handleBeforeUpload"
    >
      <div v-if="config.value" class="upload-image-wrapper">
        <img :src="config.value" alt="" />
        <el-icon class="el-upload-list__item-delete" @click.stop="removeBackgroundImage">
          <Delete />
        </el-icon>
      </div>
      <el-icon v-else>
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import 'element-plus/theme-chalk/el-loading.css'
import {Delete, Plus} from '@element-plus/icons-vue'
import {usePopupConfigStore} from '~/stores/popup-config'

const loadImage = ref(false)
const store = usePopupConfigStore()
const props = defineProps<{ config: any }>()

function removeBackgroundImage() {
  props.config.value = ''
  store.saveDescription({
    fields: [{
      key: props.config.key,
      value: props.config.value
    }]
  })
}

function handleBeforeUpload(file: any) {
  if (!file.type.toLowerCase().startsWith('image/')) {
    return console.log('所选文件不是图片格式')
  }
  loadImage.value = true
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (event: any) => {
    loadImage.value = false
    const result = event.target.result
    if (!result) {
      return console.log('背景图片为空')
    }
    if (props.config.handler && typeof props.config.handler === 'function') {
      props.config.handler(result)
    }
    props.config.value = result
    store.saveDescription({
      fields: [{
        key: props.config.key,
        value: props.config.value
      }]
    })
    console.log('读取背景图片成功')
  }
  reader.onerror = error => {
    loadImage.value = false
    console.error(`读取背景图片失败: ${error}`)
  }
  return false
}
</script>
<style lang="scss">
.ep-upload__wrapper {
    padding: 4px 0;

    .ep-loading-mask {
        backdrop-filter: blur(10px);
        background-color: transparent;

        svg circle {
            stroke-width: 6;
        }
    }

    .ep-upload__label {
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        color: var(--ep-color-primary);
    }

    .ep-upload {
        left: 50%;
        width: 160px;
        height: 160px;
        margin-top: 8px;
        overflow: hidden;
        position: relative;
        transform: translateX(-50%);
        background-color: transparent;
        --ep-text-color-secondary: white;
        border: 2px dashed var(--ep-border-color);
        transition: var(--ep-transition-duration-fast);

        .ep-icon, .ep-icon svg {
            width: 40px;
            height: 40px;
        }

        .upload-image-wrapper {
            display: flex;
            position: relative;

            &::after {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: '';
                position: absolute;
                backdrop-filter: blur(0)
            }

            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }

            .el-upload-list__item-delete {
                display: none;
                --ep-text-color-secondary: white;
            }

            &:hover {
                &::after {
                    backdrop-filter: blur(10px)
                }

                .el-upload-list__item-delete {
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                    margin: auto;
                    position: absolute;
                    display: inline-block;

                    &:hover {
                        --ep-text-color-secondary: var(--ep-color-primary);
                    }
                }
            }
        }
    }

    .ep-upload:hover {
        border-color: var(--ep-color-primary);
        --ep-text-color-secondary: var(--ep-color-primary);
    }
}
</style>
