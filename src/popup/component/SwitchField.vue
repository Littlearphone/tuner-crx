<template>
  <el-switch v-model="config.value" :active-text="config.label" @change="onChange"></el-switch>
</template>
<script setup lang="ts">
const props = defineProps<{ config: any }>();
const emits = defineEmits(['store-config']);

function onChange(value) {
  if (props.config.handler && typeof props.config.handler === 'function') {
    props.config.handler(value)
  }
  emits('store-config', {
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
