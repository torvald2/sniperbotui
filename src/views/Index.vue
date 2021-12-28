<template lang="pug">
  article
    mainNav
    b-tabs( pills content-class="mt-3").m-3
      b-tab(title="Листинги")
        article
          FutureListings
          
 
</template>

<script>
import mainNav from "@/components/Nav.vue"
import FutureListings from "../components/FutureListings.vue"

export default {
  name: 'main-page',
  data(){
    return{
    }
  },
  components:{
    mainNav,
    FutureListings

 
  },
  computed:{
  },
  methods:{
    
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch(()=>{})
    }
  }
}
}
</script>
