<template>
  <div class="home">
    <ComplexQuickList :list-data="mainData" :components="['spin', 'search', 'table', 'info', 'edit']" :simple-table="true" :components-props="componentsProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { ComplexQuickList } from '@/modules/complex-component-antd';
import { componentsProps } from '@/modules/complex-component-antd/src/QuickList';

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexQuickList
  },
  setup() {
    return {
      mainData: mainData,
      componentsProps: {
        table: {
          menu: {
            menu: [
              {
                prop: '$change',
                name: '编辑',
                color: 'link'
              },
              {
                prop: '$delete',
                name: '删除',
                color: 'danger'
              },
              {
                prop: '$info',
                name: '详情',
                color: 'link'
              },
            ]
          }
        },
        edit: {}
      } as componentsProps
    }
  },
  mounted() {
    this.mainData.loadData(true)
  },
  methods: {
  }
});
</script>
