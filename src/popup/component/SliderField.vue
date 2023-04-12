<template>
  <div class="ep-slider__wrapper">
    <span class="ep-slider__label">{{ config.label }}</span>
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

.ep-slider__wrapper {
    padding: 4px 0;

    .ep-slider__label {
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        color: var(--ep-color-primary);
    }

    .ep-slider {
        padding: 0 8px;
        width: calc(100% - 16px);

        .ep-slider__button {
            --ep-slider-button-size: 16px;
        }

        .ep-slider__marks-text {
            font-weight: 700;
        }
    }
}
</style>
