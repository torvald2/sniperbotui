<template lang="pug">
  article
    mainNav
    b-container
      h1.mt-2 Настройки
      b-row.mt-2
        b-col
          ConnectionSettings
      b-row(align-self="start").mt-2
        b-col(cols="7")
          AlertSettings
        b-col
          TelegramSetting
    Footer





</template>

<script>
// @ is an alias to /src
import mainNav from "@/components/Nav.vue" //S
import { mapActions } from 'vuex'
import ConnectionSettings from "../components/BotConnectionSettings.vue"
import TelegramSetting from "../components/TelegramSetting"
import AlertSettings from "../components/AlertSettings"
import accountSettings from "../components/accountSettings"
import Footer from "../components/Footer.vue"

export default {
  name: 'settings-page',
  data() {
    return {
      timer: undefined
    }
  },
  components: {
    mainNav,
    ConnectionSettings,
    TelegramSetting,
    AlertSettings,
    accountSettings,
    Footer
  },
  methods: {
    ...mapActions(["getBotState","getAppSettings","getAlertSettings", "getAllSymbols",]),
  },
  created() {
    if (!this.$store.getters.isAuthorized) {
            console.log("I did this Settings")
      this.$router.push("Login").catch((msg)=>{console.error(msg)})
    } else {
      this.getAlertSettings()
    }
  }
}
</script>