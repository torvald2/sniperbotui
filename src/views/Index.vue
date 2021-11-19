<template lang="pug">
  article
    mainNav
    b-tabs( pills content-class="mt-3").m-3
      b-tab(title="РУЧНЫЕ ЗАКУПКИ")
        article
          b-row
            b-col
              b-tabs
                b-tab(title="Активные")
                  b-collapse(id="filter-auto-sales-collapse")
                    FilterAutoBid
                  ManualSales(:sales="activeAutoBids" @getInfo="raiseInfoModal")
                b-tab(title="Архивные")
                  b-collapse(id="filter-auto-sales-collapse")
                    FilterAutoBid
                  ManualSales(:sales="archiveAutoBids")
                  
                template(#tabs-end).ml-3
                  b-form(inline)
                    b-form-checkbox(switch :checked="activeAutoBidSettings" ).mr-3
                      | Включить авто закупки
                    b-button(variant="info" v-b-modal.auto-bil-settings-modal size="sm" ).mr-3
                      b-icon(icon="gear-fill"  )
                    b-button(variant="success" v-b-toggle.filter-auto-sales-collapse  size="sm" )
                      b-icon(icon="funnel")              
      b-tab(title="АВТО ЗАКУПКИ")
        article
          b-row
            b-col
              b-tabs
                b-tab(title="Активные")
                  b-collapse(id="filter-auto-sales-collapse")
                    FilterAutoBid
                  AutoSalesTable(:sales="activeAutoBids" @getInfo="raiseInfoModal")
                b-tab(title="Архивные")
                  b-collapse(id="filter-auto-sales-collapse")
                    FilterAutoBid
                  AutoSalesTable(:sales="archiveAutoBids")
                  
                template(#tabs-end).ml-3
                  b-form(inline)
                    b-form-checkbox(switch :checked="activeAutoBidSettings" ).mr-3
                      | Включить авто закупки
                    b-button(variant="info" v-b-modal.auto-bil-settings-modal size="sm" ).mr-3
                      b-icon(icon="gear-fill"  )
                    b-button(variant="success" v-b-toggle.filter-auto-sales-collapse  size="sm" )
                      b-icon(icon="funnel")              
              
      b-modal(id="auto-bil-settings-modal" title="Настройки авто закупок" size="xl")
        Settings
      b-modal(id="auto-bil-info-modal" size="lg")
        AutoBidInfo(:bid_id="currentBidId")

            
              
              
      
      b-tab(title="ВСЕ АКТИВЫ")
      b-tab(title="ЛОГ")
      b-tab(title="СТАТИСТИКА")
</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"
import Settings from "@/components/AutoBidSettings.vue"
import {mapState, mapGetters} from "vuex"
import FilterAutoBid from "@/components/filterAutoBid.vue"
import AutoSalesTable from "@/components/AutoSalesTable.vue"
import AutoBidInfo from "@/components/AutoBidInfo.vue"
import ManualSales from "@/components/ManualSalesTable.vue"
export default {
  name: 'main-page',
  data(){
    return{
      currentBidId:0
    }
  },
  components:{
    mainNav,
    Settings,
    FilterAutoBid,
    AutoSalesTable,
    AutoBidInfo,
    ManualSales
 
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
