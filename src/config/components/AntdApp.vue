<style>
p{
  margin: 0;
}
</style>

<template>
  <a-config-provider :locale="locale">
    <slot />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default defineComponent({
  name: 'AntdApp',
  data() {
    return {
      locale: zhCN,
    }
  },
})
</script>
