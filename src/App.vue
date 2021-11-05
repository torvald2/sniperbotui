<template>
  <div id="app">
    <router-view @UpdateState="initState" />
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: 'layout-page',
  data(){
    return{
      timer: false,
      logTimer:false
    }
  },
  methods:{
    ...mapActions(["getBotState","getAppSettings","getAlertSettings", "getAllSymbols","getShotLogs", "GetOrdersCountMutation", "GetCanceledOrdersCountMutation"]),
    ...mapMutations(["readToken"]),
    initState(){
      if (this.$store.getters.isAuthorized){
        this.getBotState()
        this.getAppSettings()
        this.getAllSymbols()
        this.getShotLogs()
        this.GetCanceledOrdersCountMutation()
        this.GetOrdersCountMutation()
        this.timer = setInterval(this.getBotState, 1400)
        this.logTimer = setInterval(this.getShotLogs, 1100)
      }
    }
  },
  created() {
    this.readToken()
    if (!this.$store.getters.isAuthorized){
        clearInterval(this.timer)
        this.$router.push("Login")
    } 
    this.readToken()
    this.initState()

  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.getShotLogs)
  }

}
</script>