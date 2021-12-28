<template lang="pug">
  article
    mainNav






</template>

<script>
import mainNav from "@/components/Nav.vue" 


export default {
  name: 'settings-page',
  data() {
    return {
    }
  },
  components: {
    mainNav,
   
  },

  created() {
    if (!this.$store.getters.isAuthorized) {
      this.$router.push("Login").catch((msg)=>{console.error(msg)})
    } 
  }
}
</script>