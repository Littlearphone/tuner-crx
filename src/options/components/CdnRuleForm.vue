<template>
  <el-dialog draggable title="配置动态规则" v-model="store.optionFormVisible">
    <el-form :model="store.optionFormData" :rules="optionFormRules">
      <el-form-item label="ID" label-position="top" prop="id" required>
        <el-input-number :min="0" controls-position="right" v-model="store.optionFormData.id"/>
      </el-form-item>
      <el-form-item label="目标表达式" label-position="top" required>
        <el-input v-model="store.optionFormData.condition.regexFilter"/>
      </el-form-item>
      <el-form-item label="资源类型" label-position="top">
        <el-select multiple collapse-tags v-model="store.optionFormData.condition.resourceTypes">
          <el-option v-for="type in DEFAULT_RESOURCES" :label="type.name" :value="type.id" :key="type.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="处理方式" label-position="top" required>
        <el-select v-model="store.optionFormData.action.type">
          <el-option v-for="type in DEFAULT_ACTIONS" :label="type.name" :value="type.id" :key="type.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="替换表达式" label-position="top" v-if="actionType === 'redirect'" required>
        <el-input v-model="store.optionFormData.action.redirect.regexSubstitution"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary">保存</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {DEFAULT_ACTIONS, DEFAULT_RESOURCES, useOptionConfigStore} from '~/stores/option-config'

const store = useOptionConfigStore()
const actionType = ref('redirect')

function validateDuplicateId(rule, value, done) {
  const originalId = store.optionFormId
  if (originalId !== value && store.dynamicRules.find(item => item.id === value)) {
    return done(new Error('ID 已存在'))
  }
  return done()
}

const optionFormRules = {
  id: [
    {validator: validateDuplicateId, trigger: 'change'}
  ]
}
</script>
<style lang="scss" scoped>
.ep-input-number {
  width: 100%;

  ::v-deep(input) {
    text-align: left;
  }
}
</style>
