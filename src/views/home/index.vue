<template>
  <div class="home">
    <ComplexListView :list-data="mainData" :simple-table="true" :components-props="{
      table: {
        menu: {
          menu: [
            {
              prop: 'change',
              name: '编辑',
              color: 'link'
            },
            {
              prop: 'delete',
              name: '删除',
              color: 'danger'
            },
          ]
        }
      }
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
