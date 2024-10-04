<template>
  <el-card>
    <template #header>
      <el-button type="primary" :icon="Plus" @click="openCreateCdnRulePopup">添加</el-button>
      <el-button :icon="Delete" :disabled="disableDeleteAll">删除</el-button>
    </template>
    <el-table border stripe ref="rulesTable" :data="store.dynamicRules" show-overflow-tooltip>
      <el-table-column type="selection"/>
      <el-table-column label="ID" prop="id" width="50"/>
      <el-table-column label="目标表达式" prop="condition.regexFilter"/>
      <el-table-column label="资源类型" prop="condition.resourceTypes"/>
      <el-table-column label="处理方式" prop="action.type" width="100">
        <template #default="{row}">
          {{ row.action.type === 'redirect' ? '重定向' : '屏蔽' }}
        </template>
      </el-table-column>
      <!--<el-table-column label="替换表达式" prop="action.redirect.regexSubstitution"/>-->
      <el-table-column label="操作" width="80" align="center">
        <template #default="{row}">
          <el-button :icon="Edit" link @click="() => store.showOptionForm(row)"/>
          <el-button :icon="Delete" link/>
        </template>
      </el-table-column>
    </el-table>
    <CdnRuleForm/>
  </el-card>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {Delete, Edit, Plus} from '@element-plus/icons-vue'
import {useOptionConfigStore} from '~/stores/option-config'
import CdnRuleForm from '~/options/components/CdnRuleForm.vue'

const rulesTable = ref()
const store = useOptionConfigStore()

function openCreateCdnRulePopup() {
  store.optionFormVisible = true
}

const disableDeleteAll = computed(() => {
  if (rulesTable.value) {
    return !rulesTable.value.getSelectionRows().length
  }
  return true
})

onMounted(() => {
})
</script>
