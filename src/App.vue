<template>
  <AntdApp>
    <ComplexLayout />
  </AntdApp>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import pluginLayout from '@/config/complex/pluginLayout'
import AntdApp from '@/config/components/AntdApp.vue'
import ComplexLayout from '@/config/layout/ComplexLayout.vue'

export default defineComponent({
  components: {
    AntdApp,
    ComplexLayout
  },
  provide() {
    return {
      providePluginLayout: computed(() => pluginLayout)
    }
  }
})
</script>