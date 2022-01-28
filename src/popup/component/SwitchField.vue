<template>
  <el-switch v-model="config.value" :active-text="config.label" @change="onChange"></el-switch>
</template>
<script>
export default {
  name: 'SwitchField',
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
</style>
