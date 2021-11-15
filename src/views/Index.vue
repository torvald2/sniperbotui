<template lang="pug">
  article
    mainNav
    b-tabs( pills content-class="mt-3").m-3
      b-tab(title="АВТО ЗАКУПКИ")
        article
          b-row
            b-col(align-self="start" cols="7")
              b-tabs
                b-tab(title="Активные")
                b-tab(title="Архивные")
            b-col(align-self="end" cols="5")
              b-form(inline)
                b-form-checkbox(switch :checked="autoBidSettings.active" ).mr-3
                  | Включить авто закупки
                b-button(variant="info" v-b-modal.auto-bil-settings-modal size="sm" ).mr-3
                  b-icon(icon="gear-fill"  )
                b-button(variant="success" v-b-toggle.filter-auto-sales-collapse  size="sm" )
                  b-icon(icon="funnel")
          b-row.mt-2
            b-col
              b-collapse(id="filter-auto-sales-collapse")
                FilterAutoBid
          b-row.mt-2
            b-col
              AutoSalesTable
              
      b-modal(id="auto-bil-settings-modal" title="Настройки авто закупок" size="xl")
        Settings
            
              
              
              
      b-tab(title="РУЧНЫЕ ЗАКУПКИ")
      b-tab(title="ВСЕ АКТИВЫ")
      b-tab(title="ЛОГ")
      b-tab(title="СТАТИСТИКА")
</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"
import Settings from "@/components/AutoBidSettings.vue"
import {mapState} from "vuex"
import FilterAutoBid from "@/components/filterAutoBid.vue"
import AutoSalesTable from "@/components/AutoSalesTable.vue"

export default {
  name: 'main-page',
  data(){
    return{
    }
  },
  components:{
    mainNav,
    Settings,
    FilterAutoBid,
    AutoSalesTable
 
  },
  computed:{
    ...mapState(["autoBidSettings"])
  },
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch(()=>{})
    }
  }
}
</script>
