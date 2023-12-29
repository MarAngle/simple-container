<template>
  <div class="home">
    <ComplexListView :list-data="mainData" :menu="{
      table: [
        {
          prop: 'change',
          name: '编辑'
        },
        {
          prop: 'delete',
          name: '删除'
        },
      ]
    }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { ComplexListView } from '@/modules/complex-component-antd';

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexListView
  },
  setup() {
    return {
      mainData: mainData
    }
  },
  mounted() {
    this.mainData.loadData(true)
  },
  methods: {
  }
});
</script>
