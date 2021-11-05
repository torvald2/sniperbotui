<template lang="pug">
  article
    mainNav
    .mt-2
      b-row
        b-col
          b-tabs
            b-tab(title="Создание сетки ордеров")
              OrderCreate
            b-tab(title="Coбытия 24ч")
              LogEvents
            
        b-col
          b-row
            b-col
              OrdersCap
      b-row.m-3
        b-col
          b-tabs(content-class="mt-3")
            b-tab(:title="`Выполненные(${ordersCount})`")
              Orders
            b-tab(:title="`Отмененные(${canceledOrdersCount})`")
              CanceledOrders


            b-tab(title="Статистика" )
              Stat

            b-tab(title="Лог" )
              Log
      b-row.mt-3
        b-col
          Footer



</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"
import { mapActions, mapState } from 'vuex'
import OrderCreate from "../components/OrdersCreate.vue"
import OrdersCap from "../components/OrdersCap.vue"
import Log from "../components/Log.vue"
import Footer from "../components/Footer.vue"
import LogEvents from "../components/LogEvents.vue"
import Orders from "../components/FilledOrders.vue"
import CanceledOrders from "../components/CanceledOrders.vue"
import Stat from "../components/Stat.vue"

export default {
  name: 'main-page',
  data(){
    return{
      timer: undefined
    }
  },
  components:{
    mainNav,
    OrderCreate,
    OrdersCap,
    Log,
    Footer,
    LogEvents,
    Orders,
    CanceledOrders,
    Stat
  },
  methods:{
    ...mapActions(["getBotState"])
  },
  computed:{
    ...mapState(["ordersCount","canceledOrdersCount"])
  },
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch((msg)=>{console.error(msg)})
    }
  }
}
</script>
