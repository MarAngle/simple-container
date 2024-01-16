
<style scoped>
.exception {
  min-height: 500px;
  height: 80%;
  align-items: center;
  text-align: center;
  margin-top: 150px;
}

</style>

<template>
  <div class="exception">
    <div class="img">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" />
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在或无权访问</div>
      <div class="action">
        <a-button type="primary" @click="toHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Exception404',
  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
})
</script>
