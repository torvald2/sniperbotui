<template lang="pug">
  article
    mainNav



</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"

export default {
  name: 'main-page',
  data(){
    return{
    }
  },
  components:{
 
  },
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch(()=>{})
    }
  }
}
</script>
