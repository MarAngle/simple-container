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
    <ComplexQuickCascade
      :list="{
        listData: mainData,
        components: ['spin', 'search', 'table', 'info', 'edit'],
        simpleTable: true,
        componentsProps: componentsProps
      }"
      :sublist="{
        name: '子列表',
        show(payload) {
          console.log(payload)
          childData.reloadData(true)
        },
        props: {
          listData: childData
        }
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import childData from './childData';
import { ComplexQuickCascade } from '@/modules/complex-component-antd';
import { componentsProps } from '@/modules/complex-component-antd/quick/QuickList';
import floatData from '@/config/data/floatData';

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexQuickCascade
  },
  setup() {
    return {
      floatData: floatData,
      childData: childData,
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
              {
                prop: '$sublist',
                name: '子列表',
                color: 'link'
              },
            ]
          }
        },
        editModal: {
          float: floatData,
          width: 960
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
