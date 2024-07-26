<template>
  <AntdApp>
    <ComplexLayout />
  </AntdApp>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue'
import pluginLayout from '@/config/complex/pluginLayout'
import AntdApp from '@/config/components/AntdApp.vue'
import ComplexLayout from '@/config/layout/ComplexLayout.vue'
import { pluginLayoutKey } from './config/provide'

export default defineComponent({
  components: {
    AntdApp,
    ComplexLayout
  },
  setup() {
    provide(pluginLayoutKey, pluginLayout)
}
})
</script>