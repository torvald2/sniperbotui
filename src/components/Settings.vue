<template lang="pug">
  b-card(title="Настройки аккаунта" )
    b-card-text
      b-container
        b-row.mt-2
          b-col
            b-form-checkbox(@change="value => isDemo=value" :checked="botSettings.IsDemoAccount" switch size="lg"   ) Демо аккаунт
        b-row.mt-2
          b-col
            label(for="main_pair_setting_input") Основная пара
            b-form-input(list="pairs"  @input="value => main_pair=value" :value="botSettings.Symbol_1" :state="isMainPairValid" id="main_pair_setting_input" size="sm")
        b-row.mt-2
          b-col
            label(for="second_pair_setting_input") Хеджирующая пара
            b-form-input(list="pairs"  @input="value => second_pair=value" :value="botSettings.Symbol_2" :state="isSecondPairValid" id="second_pair_setting_input" size="sm")

        b-row.mt-2
          b-col
            b-button(@click="saveSettings" variant="primary") Сохранить

    b-card-text.mt-2
      b-alert(:show="isError" dismissible variant="danger" @dismissed="isError=false") Ошибка: {{errorDesc}}
      b-alert(:show="isOk"  dismissible variant="success" @dismissed="isOk=false") Настройки сохранены
    datalist(id="pairs")
      option(v-for="symbol in symbols") {{symbol.Symbol}}
</template>

<script>
import {  mapState, mapMutations} from 'vuex'
import {SavePairSettings} from "../services/api"
export default {
  name: "AccountSettings",
  data(){
    return {
     isDemo:null,
      main_pair:"",
      second_pair:"",
      isError: false,
      isOk:false,
      errorDesc:"",
      firstRun:true
    }
  },
  computed:{
    ...mapState(["botSettings","symbols", "token"]),
    isMainPairValid(){
      if (this.firstRun) {
        return true
      }
      for ( let symbol of this.symbols){
        if (symbol.Symbol === this.main_pair){
          return true
        }
        
      }
      return false
    },
    isSecondPairValid(){
      if (this.firstRun) {
        return true
      }
      for ( let symbol of this.symbols){
        if (symbol.Symbol === this.second_pair){
          return true
        }
        
      }
      return false
    },
  },
  methods:{
    ...mapMutations(["getAppSettings"]),
    async saveSettings(){
      this.isDemo === null ? this.isDemo = this.botSettings.IsDemoAccount :false
      this.main_pair === "" ? this.main_pair = this.botSettings.Symbol_1 :false
      this.second_pair === "" ? this.second_pair = this.botSettings.Symbol_2 :false
      let res = await SavePairSettings(this.token, this.main_pair, this.second_pair, this.isDemo)
      if (res[1] == 200){
        this.isOk=true
        this.getAppSettings()

      } else {
        this.isError = true
        this.errorDesc = res[0]
      }



    },
  },

  watch: {
    main_pair: function () {
      this.firstRun =false
    },
    second_pair: function () {
      this.firstRun =false
    }
  }

 
 


}
</script>

<style scoped>



</style>