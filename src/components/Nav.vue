<template lang="pug">
  b-navbar(type="dark" variant="info")
    b-navbar-brand(href="/")
      img(src="https://placekitten.com/g/30/30" alt="Kitten")
      span.ml-2 Spinner bot
    b-nav-text      
    b-nav-form.ml-auto
      b-button(variant="info" @click="goToSettings").mr-5
        b-icon(icon="gear-fill" font-scale="1.5" )
      b-nav-text {{login}}
      b-button(variant="info" @click="logOut").ml-5
        b-icon(icon="box-arrow-right" font-scale="1.5" )


</template>

<script>
import { mapMutations } from 'vuex'
import {DeleteToken} from "../services/cookie"
import {mapState} from "vuex"


export default {
  name: 'navbar',
  components:{
  },
  computed: {
    ...mapState(["login"])
   
  
  },
  methods: {
    ...mapMutations(["clearCreds"]),
    logOut(){
      DeleteToken()
      this.clearCreds()
      this.$router.push("Login")
    },
    goToSettings(){
      this.$router.push("Settings")
    }
  }
}
</script>

<style scoped>

</style>
