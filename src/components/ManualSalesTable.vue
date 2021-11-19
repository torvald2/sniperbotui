<template lang="pug">
  b-card(header-tag="header" footer-tag="footer")
    b-card-text
      b-table(
      :items="sales"
      :fields="fields"
      :current-page="currentPage"
      show-empty
      small
      no-footer-sorting
      sort-icon-left
      ref="auto_sales_table"
      )
        template(#cell(date)="row")
          | {{row.item.date | formatDate}}
        template(#cell(pair)="row")
          a(:href="row.item.pair.url") {{row.item.pair.base}}/{{row.item.pair.quote}}
        template(#cell(price)="row")
          span(v-if="row.item.price") {{row.item.price | formatPrice}}
        template(#cell(value)="row")
          span(v-if="row.item.price") {{row.item.value | formatPrice}}({{row.item.saled_percent}}%)
        template(#cell(sum)="row")
          span(v-if="row.item.price") {{row.item.value*row.item.price | formatPrice}}
        template(#cell(profit)="row")
          span(v-if="row.item.profit >0").text-success {{row.item.profit| formatSum}}({{row.item.profit_percent}}%)
          span(v-if="row.item.profit <0").text-danger {{row.item.profit| formatSum}}({{row.item.profit_percent}}%)
        template(#cell(info)="row")
          b-button-group
            b-button(variant="success" size="sm" @click="raiseInfoModal(row.item.id)" )
              b-icon(icon="pencil-square")
            b-button(variant="info" size="sm" v-if="row.item.price")
              b-icon(icon="x-square")
            b-button(variant="danger" size="sm" v-if="!row.item.price")
              b-icon(icon="x-square")

          
       
      b-pagination(
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="25")
    

</template>

<script>
import Formaters from "../mixins/formaters"

export default {
  name: "ManualSales",
  props:["sales"],
  data(){
    return {
        currentPage:1,
        totalItems:2,
        fields:[
            {key:"date", label:"Дата и время",sortable:true},
            {key:"exchange", label:"Биржа",  sortable:true},
            {key:"pair", label:"Пара",},
            {key:"price", label:"Цена закупки",  sortable:true},
            {key:"value", label:"Обьем",  sortable:true},
            {key:"sum", label:"Сумма",  sortable:true},
            {key:"profit", label:"Прибыль"},
            {key:"info", label:"Инфо", },            
        ],
    }
  },
  computed:{
   
  },
  methods:{
     raiseInfoModal(id){
         this.$emit("getInfo",id)
     },
  
  },
   mixins:[Formaters]


 


}
</script>

<style scoped>
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.hidden_header {
  display: none;
}

</style>