<template>
  <div id="app">
    <router-view @UpdateState="initState" />
  </div>
</template>

<script>
import {  mapMutations, mapActions} from "vuex";

export default {
  name: 'layout-page',
  data(){
    return{
 
    }
  },
  methods:{
    ...mapMutations(["readToken"]),
    ...mapActions(["getExchangeList","getKeys","getAllAccounts"]),
    async initState(){
      await this.getExchangeList()
      await this.getKeys()
      await this.getAllAccounts()
    }
  },
  async created() {
    this.readToken()
    if (!this.$store.getters.isAuthorized){
        this.$router.push("Login")
    } else {
      await this.initState()
    }
     
  },


}
</script>