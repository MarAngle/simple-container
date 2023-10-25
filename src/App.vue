<template>
  <AntdApp>
    <router-view />
  </AntdApp>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AntdApp from '@/components/data/AntdApp.vue'

export default defineComponent({
  components: {
    AntdApp: AntdApp
  }
})
</script>
