<template lang="pug">
  article
    mainNav
    AccountSettings






</template>

<script>
import mainNav from "@/components/Nav.vue" 
import AccountSettings from "../components/Accounts.vue"


export default {
  name: 'settings-page',
  data() {
    return {
    }
  },
  components: {
    mainNav,
    AccountSettings
   
  },

  created() {
    if (!this.$store.getters.isAuthorized) {
      this.$router.push("Login").catch((msg)=>{console.error(msg)})
    } 
  }
}
</script>