<template lang="pug">
 b-card(text="Добавить аккаунт")
        b-form
          b-container
            b-row 
              b-col
                label(for="accounts-exchange-select") Биржа
              b-col
                b-form-select(:options="exchangeSelectOptions"
                                v-model="newAccountExchange"
                                id="accounts-exchange-select"
                                )
            b-row
              b-col
                label(for="accounts-name-input") Название аккаунта
              b-col
                 b-form-input(v-model="newAccount" id="accounts-name-input" :state="newAccount.length !=0")
            b-row
              b-col
                label(for="accounts-apikey-input") API Key
              b-col
                 b-form-input(v-model="newAccountApiKey" id="accounts-apikey-input" :state="newAccountApiKey.length !=0")
            b-row
              b-col
                label(for="accounts-apisecret-input") API Secret
              b-col
                 b-form-input(v-model="newAccountApiSecret" id="accounts-apisecret-input" :state="newAccountApiSecret.length !=0")

            b-row
              b-col
                b-button(@click="save" variant="primary") Сохранить
              
</template>

<script>
import {mapState,mapActions} from "vuex"
import {NewAccount} from "../services/api"
export default {
  name: "AddAccount",
  data(){
    return{
        newAccountExchange:"",
        newAccount:"",
        newAccountApiKey:"",
        newAccountApiSecret:""

        
    }
  },
  computed:{
      ...mapState(["exchanges"]),
          exchangeSelectOptions(){
          let data = []
          for (let ex of this.exchanges){
              data.push({value:ex.id, text:ex.name})
          }
          return data
      }
      
    
  },

  methods:{
      ...mapActions(["addAccount"]),
      async save(){
          const data = await NewAccount({
              name:this.newAccount,
              exchange:this.newAccountExchange,
              publicKey:this.newAccountApiKey,
              privateKey:this.newAccountApiSecret,
          })
          if (data.data){
              this.addAccount(data.data)
          } else {
              console.log(data.error)

          }

          
          
      }
    
  },
}
</script>
