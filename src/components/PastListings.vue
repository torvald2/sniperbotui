<template lang="pug">
  b-card(header-tag="header" footer-tag="footer")
    template(#header)
      | Состоявшиеся
    b-card-text
      b-table(
      :items="DataProvider"
      :fields="fields"
      show-empty
      small
      no-footer-sorting
      sort-icon-left
      ref="future_listings_table"
      )
        template(#cell(created)="row")
          | {{row.item.created | formatDate}}
        template(#cell(time_to_start)="row")
          | {{row.item.time_to_start | formatTimestampToTime}}
        template(#cell(pairs)="row")
          | {{row.item.pairs.join(",")}}

    

</template>

<script>
import {GetListings} from "../services/api"
import Formaters from "../mixins/formaters"

export default {
  name: "FutureOrders",
  mixins:[Formaters],
  data(){
    return {
        fields:[
            {key:"created", label:"Дата и время"},
            {key:"time_to_start", label:"Время до начала"},
            {key:"exchange", label:"Биржа "},
            {key:"pairs", label:"Пары",},
            
        ],
    }
  },

  methods:{
  
   async  DataProvider(){
     let result = []
     let pushedBase = []
     const data = await GetListings(1000, 0, {"active":false},null,null, "createdAt", true)
     if (data.isOk) {
       const now = Date.now()
       for (let el of data.data.list){
         console.log(result.length)
         if (pushedBase.indexOf(el.raw.base)==-1){
          if (el.raw.info.buy_start && (el.raw.info.buy_start - (now/1000))>0){
             pushedBase.push(el.raw.base)
             result.push({
              created:el.createdAt,
              time_to_start: el.raw.info.buy_start - (now/1000),
              exchange: el.exchange,
              pairs:[el.pair],
              base: el.raw.base
             })
          }  
          
         } else {
           let objIndex = result.findIndex((obj => obj.base == el.raw.base))
           if (objIndex!=-1){
             result[objIndex].pairs.push(el.pair)
           }

         }
       }
       
     }
     return result


   }
  },

}
</script>

<style scoped>


</style>