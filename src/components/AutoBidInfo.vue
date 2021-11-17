<template lang="pug">
b-card(:title="`Подробнее о ${bid.pair.base}/${bid.pair.quote}`")
  b-card-text
    b-row
      b-col
        | Прибыль (текущая):
        span( v-if="bid.profit >0").text-success ({{bid.profit| formatSum}}) 
        span(v-if="bid.profit <0").text-danger ({{bid.profit| formatSum}})
      b-col
        | Доступно : {{bid.avaliableValue}}
      b-col
        b-button(variant="success") Продать все сейчас
    hr
    b-row
      b-col(align-self="start" cols="4")
        | Ордера на закупку {{sellOrders.length}}
      b-col(align-self="end" cols="4")
        | Закуплено токенов 12345
    b-row
      b-col
        b-table(:items="sellOrders" :fields="fields" small)
          template(#cell(date)="row")
            | {{row.item.date | formatDate}}
          template(#cell(type)="row")
            span(v-if="row.item.type==='market'") Маркет
            span(v-if="row.item.type==='limit'") Лимит
          template(#cell(price)="row")
            | {{row.item.price | formatPrice}}
          template(#cell(value)="row")
            | {{row.item.value | formatPrice}}
          template(#cell(sum)="row")
            | {{row.item.value*row.item.price | formatPrice}}
    hr
    b-row
      b-col(align-self="start" cols="4")
        | Ордера на продажу {{buyOrders.length}}
      b-col(align-self="end" cols="4")
        | Продано токенов 12345
    b-row
      b-col
        b-table(:items="buyOrders" :fields="fields" small)
          template(#cell(date)="row")
            | {{row.item.date | formatDate}}
          template(#cell(type)="row")
            span(v-if="row.item.type==='market'") Маркет
            span(v-if="row.item.type==='limit'") Лимит
          template(#cell(price)="row")
            | {{row.item.price | formatPrice}}
          template(#cell(value)="row")
            | {{row.item.value | formatPrice}}
          template(#cell(sum)="row")
            | {{row.item.value*row.item.price | formatPrice}}
          
          

    

      
    

</template>

<script>
import {mapGetters} from "vuex"
import Formaters from "../mixins/formaters"

export default {
  name: "Info",
  props:["bid_id"],
  data(){
    return{
        sellOrders:[
            {id:1234, date:"2021-09-15T16:45:05.435Z",type:"market",price:0.12345, value:123256},
            {id:1234, date:"2021-09-13T16:45:05.435Z",type:"limit",price:1.12345, value:33233}
        ],
        buyOrders:[
            {id:1234, date:"2021-09-11T16:45:05.435Z",type:"market",price:0.12345, value:123256},
            {id:1234, date:"2021-09-15T12:45:05.435Z",type:"limit",price:1.12345, value:33233}
        ],
        fields:[
            {key:"id", label:"ID ордера"},
            {key:"date", label:"Дата и время"},
            {key:"type", label:"Тип"},
             {key:"price", label:"Цена"},
             {key:"value", label:"Обьем"},
             {key:"sum", label:"Сумма"},

        ]
        
     
    }
  },
  computed:{
      ...mapGetters(["getBidById"]),
      bid(){
          return this.getBidById(this.bid_id)
      }
    
  },

  methods:{
    
  },
   mixins:[Formaters]
}
</script>

<style scoped>
.centred{
  bottom: 0;
  overflow-y: auto;
}
.login-card{
  max-width: 700px;
  min-width: 300px;
}

</style>