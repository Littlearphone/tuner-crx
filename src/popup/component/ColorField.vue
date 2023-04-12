<template>
  <div class="ep-color-picker__wrapper display-flex-center flex-between">
    <span class="ep-color-picker__label">{{ config.label }}</span>
    <el-color-picker v-model="config.value" show-alpha @change="handleColorChange" />
  </div>
</template>
<script setup lang="ts">
import {usePopupConfigStore} from '~/stores/popup-config'

const store = usePopupConfigStore()
const props = defineProps<{ config: any }>()

function handleColorChange(value: string) {
  store.saveDescription({
    fields: [{
      key: props.config.key,
      value: value || '#f6f6f6'
    }]
  })
}
</script>
<style lang="scss">
.ep-color-picker__wrapper {
    padding: 4px 0;

    .ep-color-picker__label {
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        color: var(--ep-color-primary);
    }
}
</style>
