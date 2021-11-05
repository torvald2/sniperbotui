<template lang="pug">
  Login(@Logined="$emit('UpdateState')")
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'login-page',
  components: {
    Login
  },

}
</script>
