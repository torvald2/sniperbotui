<template>
  <div id="app">
    <router-view @UpdateState="initState" />
  </div>
</template>

<script>
import { mapActions, mapMutations} from "vuex";

export default {
  name: 'layout-page',
  data(){
    return{
 
    }
  },
  methods:{
    ...mapMutations(["readToken"]),
    ...mapActions(["getAccounts"]),
    async initState(){
      await this.getAccounts()
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