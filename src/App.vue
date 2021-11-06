<template>
  <div id="app">
    <router-view @UpdateState="initState" />
  </div>
</template>

<script>
import { mapMutations,mapActions} from "vuex";

export default {
  name: 'layout-page',
  data(){
    return{
 
    }
  },
  methods:{
    ...mapMutations(["readToken"]),
    ...mapActions(["getBotSettings","actFutureListings"]),
    async initState(){
      await this.getBotSettings()
       await this.actFutureListings()

    }
  },
  async created() {
    this.readToken()
    if (!this.$store.getters.isAuthorized){
        this.$router.push("Login")
    } 
    await this.getBotSettings()
    await this.actFutureListings()
  },


}
</script>