<template lang="pug">
  b-navbar(navbar-light style="background-color: #e3f2fd;")
    b-navbar-brand(href="/")
      b-icon( icon="arrow-clockwise")
      span.ml-2 Spinner bot
    b-nav-text
      | Ручные закупки: {{profit.manualBidCount }}
      span( v-if="profit.manualProfit >0").text-success ({{profit.manualProfit| formatSum}}) 
      span(v-if="profit.manualProfit <0").text-danger ({{profit.manualProfit| formatSum}})
    b-nav-text.ml-3
      | Авто закупки: {{profit.autoBidCount }}
      span(v-if="profit.autoProfit >0").text-success ({{profit.autoProfit| formatSum}}) 
      span( v-if="profit.autoProfit <0").text-danger ({{profit.autoProfit| formatSum}})  
    b-nav-text.ml-3
      | Результат итого: 
      span( v-if="profit.manualProfit +profit.autoProfit >0").text-success ({{profit.autoProfit+profit.manualProfit| formatSum}}) 
      span(v-if="profit.manualProfit +profit.autoProfit <0").text-danger ({{profit.autoProfit + profit.manualProfit| formatSum}})   
    b-nav-form.ml-auto
      b-button(variant="info" @click="goToSettings" size="sm").mr-5
        b-icon(icon="gear-fill" font-scale="1.5" )
      b-nav-text {{login}}
      b-button(variant="info" @click="logOut" size="sm").ml-5
        b-icon(icon="box-arrow-right" font-scale="1.5" )


</template>

<script>
import {DeleteToken} from "../services/cookie"
import {mapGetters,mapState} from "vuex"
import Formaters from "../mixins/formaters"


export default {
  name: 'navbar',
  components:{
  },
  computed: {
    ...mapGetters(["profit"]),
    ...mapState(["login"])
   
  
  },
  methods: {
    logOut(){
      DeleteToken()
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
