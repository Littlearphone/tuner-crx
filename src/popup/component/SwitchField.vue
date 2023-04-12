<template>
  <el-switch v-model="config.value" :active-text="config.label" @change="onChange"></el-switch>
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
    fields: [{
      key: props.config.key,
      value: props.config.value
    }]
  })
}
</script>
<style lang="scss">
h3 {
    width: 170px;
}
</style>
