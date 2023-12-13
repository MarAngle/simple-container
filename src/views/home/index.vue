<template>
  <div class="home">
    <ComplexTableView :list-data="mainData" :column-list="(mainData.$getDictionaryPageList('list') as DefaultList[])" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { TableView } from '@/modules/complex-component-antd';
import DefaultList from 'complex-data/src/dictionary/DefaultList';

mainData.$loadData(true)

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexTableView: TableView
  },
  data() {
    return {
      mainData: mainData
    }
  },
});
</script>
