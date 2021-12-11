<template lang="pug">
  b-card()
      template(#header)
        b-row
          b-col(cols="2")
            label Аккаунты
          b-col(cols="1")
            label Биржа
          b-col(cols="2")
            b-form-select(:options="exchangeSelectOptions", v-model="filterExchange" size="sm").ml-2
          b-col(cols="1")
            label Поиск
          b-col(cols="3")
            b-input-group(size="sm").ml-2
              template(#append)
                b-button(disabled)
                  b-icon(icon="search")
              b-form-input(v-model="filter_account_text")
          b-col(cols="3")
            b-button(@click="raiseAddModal" variant="primary" size="sm").ml-2 Добавить аккаунт      
      b-table(
      :items="accounts"
      :fields="fields"
      show-empty
      small
      no-footer-sorting
      )
        template(#cell(publicKey)="row")
          | {{row.item.publicKey | formatKey}}
        template(#cell(info)="row")
          b-button-group
            b-form-checkbox(:checked="row.item.isActive" @change="changeActive" switch)
            b-button(variant="info" size="sm" @click="raiseEditModal(row.item._id)")
              b-icon(icon="pencil-square")
            b-button(variant="danger" size="sm" @click="raiseDeleteModal(row.item._id)")
              b-icon(icon="x-square")
      b-modal(id="add-account-modal" ok-disabled cancel-disabled)
        AddAccount
     

        
</template>

<script>
import {mapState} from "vuex"
import Formaters from "../mixins/formaters"
import AddAccount from "./addAccount.vue"
export default {
  name: "AccountSettings",
  components:{
AddAccount
  },
  data(){
    return {
        currentPage:1,
        totalItems:2,
        fields:[
            {key:"exchange", label:"Биржа"},
            {key:"name", label:"Аккаунт"},
            {key:"preferences",label:"Права доступа"},
            {key:"publicKey", label:"API Key",},
            {key:"info", label:"Управление", },            
        ],
        filterExchange:"",
        filter_account_text:"",
    }
  },
  computed:{
      ...mapState(["exchanges","accounts"]),
      exchangeSelectOptions(){
          let data = []
          for (let ex of this.exchanges){
              data.push({value:ex.id, text:ex.name})
          }
          return data
      }
   
  },
  methods:{
     raiseEditModal(id){
         this.$emit("getInfo",id)
     },
     raiseAddModal(){
         this.$bvModal.show("add-account-modal")

     },
     changeActive(value){
         //Тут если деактивируем или активируем 
         console.log(value)
     },
     raiseDeleteModal(id){
         console.log(id)
     }
  
  },
   mixins:[Formaters]


 


}
</script>

<style scoped>


</style>