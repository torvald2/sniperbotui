<template lang="pug">
  article
    mainNav
    b-tabs(content-class="mt-3")
      b-tab(title="Создание ордеров")
        b-card.mt-2
          b-row
            b-col
              ListingFixedSettings
      b-tab(title="Сопровождение и закрытие")
         b-card.mt-2
           MaintenanceSettings
      b-tab(title="Ордера")
      b-tab(title="Статистика")


</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue"
import MaintenanceSettings from "@/components/MaintenanceSettings.vue"
import ListingFixedSettings from "@/components/ListingFixedSettings.vue"

export default {
  name: 'main-page',
  data(){
    return{
    }
  },
  components:{
    mainNav,
    MaintenanceSettings,
    ListingFixedSettings

  },
  beforeMount() {
    if ( ! this.$store.getters.isAuthorized){
      this.$router.push("Login").catch(()=>{})
    }
  }
}
</script>
