<template>
  <div class="el-slider__wrapper">
    <span class="el-slider__label">{{ config.label }}</span>
    <el-slider
      :min="config.min"
      :max="config.max"
      @change="onChange"
      :step="config.step"
      :marks="config.marks"
      v-model="config.value"
      :show-input="config.showInput"
    ></el-slider>
  </div>
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

.ep-slider__wrapper {
  padding: 8px 0;

  .ep-slider__label {
    line-height: 1;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    color: var(--el-color-primary);
  }

  .ep-slider {
    padding: 0 8px;
    width: calc(100% - 16px);

    .ep-slider__button {
      --el-slider-button-size: 16px;
    }
  }

}
</style>
