
<style scoped>
.login-index {

}

</style>

<template>
  <div class="login-index">
    <a-button @click="onLogin">登录</a-button>
  </div>
</template>

<script lang="ts">
import userData from '@/config/data/userData';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginIndex',
  methods: {
    onLogin() {
      userData.login({
        account: '',
        password: ''
      }).then(() => {
        const redirect = this.$route.query.redirect as string || '/'
        this.$router.push(redirect)
      })
    }
  }
})
</script>
