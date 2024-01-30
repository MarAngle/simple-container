<template>
  <div class="home">
    <ComplexListView :list-data="mainData" :simple-table="true" :components-props="componentsProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mainData from './mainData';
import { ComplexListView } from '@/modules/complex-component-antd';
import DefaultEditButton from 'complex-data/src/dictionary/DefaultEditButton';

export default defineComponent({
  name: 'HomeView',
  components: {
    ComplexListView
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
            ]
          }
        },
        edit: {
          menu: [
            new DefaultEditButton({
              prop: 'test',
              name: '测试',
              type: 'button'
            })
          ]
        }
      }
    }
  },
  mounted() {
    this.mainData.loadData(true)
  },
  methods: {
  }
});
</script>
