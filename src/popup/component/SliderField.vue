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
<script>
export default {
  name: 'SliderField',
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  watch: {},
  data() {
    return {}
  },
  methods: {
    onChange(value) {
      if (this.config.handler && typeof this.config.handler === 'function') {
        this.config.handler.call(this, value)
      }
      this.$emit('store-config', {
        fields: [{
          key: this.config.key,
          value: this.config.value
        }]
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss">
h3 {
  width: 170px;
}

.el-slider__wrapper {
  padding: 8px 0;

  .el-slider__label {
    line-height: 1;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    color: var(--el-color-primary);
  }

  .el-slider {
    padding: 0 8px;
    width: calc(100% - 16px);

    .el-slider__button {
      --el-slider-button-size: 16px;
    }
  }

}
</style>
