<template lang="pug">
  b-navbar(type="dark" variant="info")
    b-navbar-brand(href="/")
      b-icon( icon="arrow-clockwise")
      span.ml-2 Spinner bot
    b-nav-text 
      | Ручные закупки: {{profit.manualBidCount }}
      span(variant="success" v-if="profit.manualProfit >0") ({{profit.manualProfit| formatSum}}) 
      span(variant="danger" v-if="profit.manualProfit <0") ({{profit.manualProfit| formatSum}})
      | Авто закупки: {{profit.autoBidCount }}
      span(variant="success" v-if="profit.autoProfit >0") ({{profit.autoProfit| formatSum}}) 
      span(variant="danger" v-if="profit.autoProfit <0") ({{profit.autoProfit| formatSum}})  
      | Результат итого: 
      span(variant="success" v-if="profit.manualProfit +profit.autoProfit  >0") ({{profit.autoProfit+profit.manualProfit| formatSum}}) 
      span(variant="danger" v-if="profit.manualProfit +profit.autoProfit <0") ({{profit.autoProfit + profit.manualProfit| formatSum}})   
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
import {mapGetters} from "vuex"
import Formaters from "../mixins/formaters"


export default {
  name: 'navbar',
  components:{
  },
  computed: {
    ...mapGetters(["profit"])
   
  
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
