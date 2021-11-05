<template lang="pug">
  b-card(header-tag="header" footer-tag="footer")
    template(#header)
      b-form(inline)
        label За период
        b-form-select(v-model="selected_period" :options="period_ops" size="sm").ml-2
        b-form-select(v-model="selected_period_value" :options="period_values" size="sm").ml-2
        label(v-if="selected_period_value===9").ml-1 С 
        b-form-datepicker(v-if="selected_period_value===9" v-model="fromDate")
        label(v-if="selected_period_value===9").ml-1 По
        b-form-datepicker(v-if="selected_period_value===9" v-model="toDate")
        label.ml-2 Направление
        b-form-select(v-model="selected_direction" :options="direction_values" size="sm").ml-1
        label.ml-2 Тип
        b-form-select(v-model="selected_type" :options="type_values" size="sm").ml-2
        b-input-group(size="sm").ml-2
          b-input-group-append(is-text)
            b-icon(icon="search")
          b-form-input(v-model="filter" placeholder="Номер ордера")  
        b-button(variant="outline-primary" size="sm").ml-3
          b-icon(icon="arrow-clockwise") 
          | Обновить       
    b-card-text
      b-table(
      :items="DataProvider"
      :fields="fields"
      :current-page="currentPage"
      show-empty
      small
      no-footer-sorting
      sort-icon-left
      :filter="filter"
      ref="calceled_orders_table"
      )
        template(#cell(CreatedAt)="row")
          span(v-if="selected_period===1")
            | {{row.item.CreatedAt | formatDate}}
          span(v-else)
            | {{row.item.UpdatedAt | formatDate}} 
        template(#cell(Sum)="row")
          | {{row.item.Price*row.item.Quantity | formatPrice}}
        template(#cell(HedgeOrder)="row")
          b-button(id="tooltip-button-show-event" v-if="row.item.HedgeOrder" @click="row.toggleDetails" variant="link") 
            | {{row.item.HadgeData.ClientOrderId}}
        template(#row-details="row")
          b-card
            b-row(align-h="end")
              b-col(cols="4")
                b-row(align-h="end")
                  b-col(cols="5")
                    b Дата создания: 
                  b-col(cols="5")
                    | {{row.item.HadgeData.CreatedAt | formatDate}}
                b-row(align-h="end")
                  b-col(cols="5")
                    b Дата исполнения:
                  b-col(cols="5")
                    | {{row.item.HadgeData.UpdatedAt | formatDate}}
                b-row(align-h="end")
                  b-col(cols="5")
                    b Статус:
                  b-col(cols="5")
                    | {{row.item.HadgeData.Status }}
              b-col(cols="3")
                b-row(align-h="end")
                  b-col(cols="4")
                    b Цена :
                  b-col(cols="4")
                    | {{row.item.HadgeData.Price }}
                b-row(align-h="end")
                  b-col(cols="4")
                    b Обьем :
                  b-col(cols="4")
                    | {{row.item.HadgeData.Quantity }}
                b-row(align-h="end")
                  b-col(cols="4")
                    b Сумма :
                  b-col(cols="4")
                    | {{row.item.HadgeData.Price*row.item.HadgeData.Quantity | formatPrice}}
                
            
                
        
      b-pagination(
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="25")
    

</template>

<script>
import {  mapState} from 'vuex'
import {GetOrders, GetHadgeOrder} from "../services/api"
import FormatDate from "../helpers/formatDate"
import getPeriod from "../helpers/formatFilterPeriods"
import roundPrice from "../helpers/round"

export default {
  name: "FilledOrders",
  data(){
    return {
        fields:[
            {key:"ClientOrderId", label:"# Ордера"},
            {key:"CreatedAt", label:"Дата",  sortable:true},
             {key:"Type", label:"Тип ",  sortable:true},
            {key:"Side", label:"Направление",  sortable:true},
            {key:"Quantity", label:"Обьем",  sortable:true},
            {key:"Price", label:"Цена",  sortable:true},
            {key:"Sum", label:"Сумма", },
            {key:"HedgeOrder", label:"Хедж ордер", },
            
        ],
        currentPage:1,
        totalItems:0,
        filter:null,
        selected_period_value:1,
        selected_period:2,
        period_ops:[
            {value:1, text:"Исполнения"},
            {value:2,text:"Создания"}
        ],
        period_values:[
            {value:1, text:"Все время"},
            {value:2, text:"Сегодня"},
            {value:3, text:"Вчера"},
            {value:4, text:"За 3 дня"},
            {value:5, text:"За 7 дней"},
            {value:6, text:"За 15 дней"},
            {value:7, text:"За 1 мес."},
            {value:8, text:"За 3 мес."},
            {value:9, text:"Задать произвольно"},
        ],
        selected_direction:"all",
        direction_values:[
            {value:"all", text:"Любое"},
            {value:"Sell", text:"Sell"},
            {value:"Buy",text:"Buy"}
        ],
        fromDate:null,
        toDate:null,
        selected_type:"all",
        type_values: [
            {value:"all", text:"Любой"},
            {value:"Market", text:"Market"},
            {value:"Limit", text:"Limit"}
        ],


    }
  },
  computed:{
    ...mapState([ "token"]),
   
  },
  methods:{
  
   async  DataProvider(ctx){
       const filters = {}
       if (this.selected_period_value===9 ){
         if (this.fromDate && this.toDate) {
           let start = new Date(this.fromDate)
           start.setHours(3,0,0)
           let end = new Date(this.toDate)
           end.setHours(3,0,0)
           if (this.selected_period === 2){
             filters.CreatedAt_before = end.toISOString()
             filters.CreatedAt_after = start.toISOString()
           } else {
               filters.UpdatedAt_after = start.toISOString()
               filters.UpdatedAt_before = end.toISOString() 
           }
         }
       } else {
         let val = getPeriod(this.selected_period_value)
         if (this.selected_period === 2){
             filters.CreatedAt_before = val.end
             filters.CreatedAt_after = val.start
           } else {
               filters.UpdatedAt_after = val.start
               filters.UpdatedAt_before = val.end
           }
       }
       if (ctx.filter){
         filters.ClientOrderId = ctx.filter
       }
       if (this.selected_direction !=="all"){
         filters.Side = this.selected_direction
       }
       if (this.selected_type !=="all"){
         filters.Type = this.selected_type
       }
       let sortBy = ctx.sortBy
       if (ctx.sortBy === "CreatedAt" && this.selected_period===1){
         sortBy = "UpdatedAt"
         console.log("Upd")

       } 
       const resp = await GetOrders(this.token, ctx.currentPage, "Filled", filters,sortBy,ctx.sortDesc)
       if (resp.isOk){
           this.totalItems = resp.data.count
           let data = []
           for (const el of resp.data.results){
             if (el.HedgeOrder){
                   const resp = await GetHadgeOrder(this.token, el.HedgeOrder)
                   if (resp.isOk){
                       el.HadgeData = resp.data
                   }
                   
               }
              data.push(el)

           }          
           return data
        }
        else {
          return []
        }
   }
  },
  filters:{
      formatDate(val){
          const thisDate = Date.parse(val)
          return FormatDate(thisDate)
      },
      formatPrice(val){
      return roundPrice(val,2)

    },


  },
  watch:{
    selected_period_value: function(){
      this.$refs.calceled_orders_table.refresh()
    },
    selected_direction: function(){
      this.$refs.calceled_orders_table.refresh()
    },
     fromDate: function(){
      this.$refs.calceled_orders_table.refresh()
    },
    toDate: function(){
      this.$refs.calceled_orders_table.refresh()
    },
    selected_type: function(){
      this.$refs.calceled_orders_table.refresh()
    },
    selected_period: function(){
        this.$refs.calceled_orders_table.refresh()
    }
    
  }
 


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
