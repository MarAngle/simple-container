<style>
.home{
  background-color: #ccc;
  width: 100%;
  height: 100%;
  padding: 12px;
}
.complex-table{
  background-color: #fff;
}
</style>
<template>
  <div class="home">
    <ComplexQuickList :list-data="mainData" :components="['spin', 'search', 'table', 'info', 'edit']" :simple-table="true" :float="floatData" :components-props="componentsProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { ComplexQuickList } from '@/modules/complex-component-antd';
import { componentsProps } from '@/modules/complex-component-antd/quick/QuickList';
import floatData from '@/config/data/floatData';

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexQuickList
  },
  setup() {
    return {
      floatData: floatData,
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
        edit: {},
        // search: {
        //   collapse: true
        // },
        searchCollapse: {
          height: 81
        }
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
