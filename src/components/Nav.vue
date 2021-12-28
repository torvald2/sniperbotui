<template lang="pug">
  b-navbar(navbar-light style="background-color: #e3f2fd;")
    b-navbar-brand(href="/")
      b-icon( icon="arrow-clockwise")
      span.ml-2 Spinner bot
    
    b-nav-form.ml-auto
      b-button(variant="primary" @click="goToSettings" size="sm").mr-5
        b-icon(icon="play-fill" font-scale="1.5" )
        | Создать трейд
      b-button(variant="info" @click="logOut" size="sm").ml-5
        b-icon(icon="box-arrow-right" font-scale="1.5" )


</template>

<script>
import {mapGetters,mapState, mapMutations} from "vuex"
import Formaters from "../mixins/formaters"


export default {
  name: 'navbar',
  components:{
  },
  computed: {
    ...mapGetters(["profit"]),
    ...mapState(["login"]),

   
  
  },
  methods: {
    ...mapMutations(["clearCreds"]),
    logOut(){
      this.clearCreds()
      this.$router.push("Login")
    },
    goToSettings(){
      this.$router.push("Settings")
    }
  },
  mixins:[Formaters]
}
</script>

<style scoped>

</style>
