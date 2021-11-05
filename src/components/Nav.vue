<template lang="pug">
  b-navbar(type="dark" variant="info")
    b-navbar-brand(href="/")
      img(src="https://placekitten.com/g/30/30" alt="Kitten")
      span.ml-2 Trade Bot
    b-nav-text
      |{{balancesRow}}
    BotControl.ml-3
      
    b-nav-form.ml-auto
      b-button(variant="info" @click="goToSettings").mr-5
        b-icon(icon="gear-fill" font-scale="1.5" )
      b-nav-text {{login}}
      b-button(variant="info" @click="logOut").ml-5
        b-icon(icon="box-arrow-right" font-scale="1.5" )


</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BotControl from "../components/botControl.vue"
import {DeleteToken} from "../services/cookie"


export default {
  name: 'navbar',
  components:{
    BotControl
  },
  computed: {
    ...mapState([
        "botIsLaunched",
        "balances",
        "login"
    ]),
    balancesRow(){
      let data = "Балансы: "
      for (let key in this.balances){
        data = data + key + " : " + this.balances[key] + "  "
      }
      return data
    }
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
