<template>
  <AntdApp>
    <router-view />
  </AntdApp>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import AntdApp from '@/config/components/AntdApp.vue'
import pluginLayout from '@/config/complex/pluginLayout'

export default defineComponent({
  components: {
    AntdApp: AntdApp
  },
  provide() {
    return {
      pluginLayout: computed(() => pluginLayout)
    }
  }
})
</script>