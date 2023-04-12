<template>
  <div class="ep-upload__wrapper">
    <span class="ep-upload__label">{{ config.label }}</span>
    <el-upload
      :on-error="() => {}"
      :on-success="() => {}"
      :show-file-list="false"
      action="#import-background-image"
      :before-upload="handleBeforeUpload"
    >
      <img v-if="config.value" :src="config.value" alt="" />
      <el-icon v-else>
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>
<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
import {usePopupConfigStore} from '~/stores/popup-config'

const store = usePopupConfigStore()
const props = defineProps<{ config: any }>()


function handleBeforeUpload(file: any) {
  if (!file.type.toLowerCase().startsWith('image/')) {
    return console.log('所选文件不是图片格式')
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (event: any) => {
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
  reader.onerror = error => console.error(`读取背景图片失败: ${error}`)
  return false
}
</script>
<style lang="scss">
.ep-upload__wrapper {
    padding: 4px 0;

    .ep-upload__label {
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        color: var(--ep-color-primary);
    }

    .ep-upload {
        width: 236px;
        height: 236px;
        --color: white;
        cursor: pointer;
        margin-top: 8px;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        border: 2px dashed var(--ep-border-color);
        transition: var(--ep-transition-duration-fast);

        .ep-icon, .ep-icon svg {
            width: 40px;
            height: 40px;
        }

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    .ep-upload:hover {
        --color: var(--ep-color-primary);
        border-color: var(--ep-color-primary);
    }
}
</style>
