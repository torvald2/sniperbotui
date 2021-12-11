<template lang="pug">
  article
    mainNav
    b-tabs( pills content-class="mt-3").m-3
      b-tab(title="Листинги")
        article
          FutureListings
          
 
</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"
import {mapState, mapGetters} from "vuex"
import FutureListings from "../components/FutureListings.vue"

export default {
  name: 'main-page',
  data(){
    return{
      currentBidId:0
    }
  },
  components:{
    mainNav,
    FutureListings

 
  },
  computed:{
    ...mapState(["activeAutoBidSettings"]),
    ...mapGetters(["getAutoBids"]),
    activeAutoBids(){
      return this.getAutoBids({isActive:true})
    },
    archiveAutoBids(){
      return this.getAutoBids({isActive:false})
    }
  },
  methods:{
    raiseInfoModal(id){
      this.currentBidId = id
      this.$bvModal.show("auto-bil-info-modal")
    }
  },
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch(()=>{})
    }
  }
}
</script>
