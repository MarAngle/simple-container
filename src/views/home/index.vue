<template>
  <div class="home">
    <ComplexListView :list-data="mainData" />
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
    this.mainData.$loadData(true)
  },
  methods: {
  }
});
</script>
