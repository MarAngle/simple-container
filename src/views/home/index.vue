<template>
  <div class="home">
    <a-button @click="onEdit">新增</a-button>
    <ComplexTableView :list-data="mainData" :column-list="(mainData.$getDictionaryPageList('list') as DefaultList[])" >
      <template #menu="{ payload }" >
        <div>
          <span @click="onEdit(payload.targetData)">修改</span>
        </div>
      </template>
    </ComplexTableView>
    <ComplexModalView ref="modal" :title="'新增'" :menu="['cancel', 'submit']" >
      <template #default="{ height }">
        <div :style="{ height: height + 'px' }">
          <ComplexEditView ref="edit" :dictionary="mainData.$module.dictionary!" />
        </div>
      </template>
    </ComplexModalView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { ComplexTableView, ComplexModalView, ComplexEditView } from '@/modules/complex-component-antd';
import DefaultList from 'complex-data/src/dictionary/DefaultList';

mainData.$loadData(true)

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexTableView,
    ComplexModalView,
    ComplexEditView
  },
  data() {
    return {
      mainData: mainData
    }
  },
  methods: {
    onEdit(record?: Record<PropertyKey, unknown>) {
      (this.$refs.modal as any).show(record ? '编辑' : '新增')
      this.$nextTick(() => {
        (this.$refs.edit as any).show(record ? 'change' : 'build', record)
      })
    }
  }
});
</script>
