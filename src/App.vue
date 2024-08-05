<template>
  <AntdApp>
    <ComplexLayout />
    <QuickFloat :float="floatData" />
  </AntdApp>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue'
import pluginLayout from '@/config/complex/pluginLayout'
import AntdApp from '@/config/components/AntdApp.vue'
import ComplexLayout from '@/config/layout/ComplexLayout.vue'
import { pluginLayoutKey } from './config/provide'
import QuickFloat from './modules/complex-component-antd/quick/QuickFloat'
import floatData from './config/data/floatData'

export default defineComponent({
  components: {
    AntdApp,
    ComplexLayout,
    QuickFloat
  },
  setup() {
    provide(pluginLayoutKey, pluginLayout)
    return {
      floatData: floatData
    }
  }
})
</script>