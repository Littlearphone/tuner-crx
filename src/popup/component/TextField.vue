<template>
  <div class="ep-slider__wrapper">
    <span class="ep-slider__label">{{ config.label }}</span>
    <el-input
      clearable
      @change="onChange"
      v-model="config.value"
      :type="config.inputType || 'textarea'"
    />
  </div>
</template>
<script setup lang="ts">
import {usePopupConfigStore} from '~/stores/popup-config'

const props = defineProps<{ config: any }>()
const store = usePopupConfigStore()

function onChange(value: any) {
  if (props.config.handler && typeof props.config.handler === 'function') {
    props.config.handler(value)
  }
  store.saveDescription({
    fields: [
      {
        key: props.config.key,
        value: props.config.value
      }
    ]
  })
}
</script>
<style lang="scss">
.ep-textarea {
  padding: 6px 0;

  textarea {
    background-color: var(--ep-color-primary-light-9);
  }
}
</style>
