<template lang="pug">
  b-card( footer-tag="footer")
    template(#header)
      b-form(inline)
        label За период
        b-form-select(v-model="selected_period" :options="period_values" size="sm").ml-2
        label(v-if="selected_period===9").ml-2 Дата начала
        b-form-datepicker(v-model="start_date" v-if="selected_period===9").ml-2
        label(v-if="selected_period===9").ml-2 Дата окончания
        b-form-datepicker(v-model="end_date" v-if="selected_period===9").ml-2
        label Для пары
        b-form-select(v-model="forPair" :options="pairOptions" size="sm").ml-2
        b-button(variant="info" @click="calc").ml-2 Расчитать
    b-card-text
      b-container
        b-row
          b-col
            b-form-textarea(:value="stat" rows="30" plaintext)
        
        
    

</template>

<script>
import {  mapState} from 'vuex'
import {GetStat} from "../services/api"
import getPeriod from "../helpers/formatFilterPeriods"
export default {
  name: "Logs",
  data(){
    return {
        start_date:"",
        end_date:"",
        stat:"",
        selected_period:2,
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
        forPair:"1",
        pairOptions:[
         {value:"1", text:"...loading"}
        ]
      
    }
  },
  computed:{
    ...mapState([ "token","botSettings"]),
    
  },
  methods:{
   async  calc(){
       let startDate = ""
       let endDate = ""
       if (this.selected_period===9 ){
         let start = new Date(this.start_date)
         start.setHours(3,0,0)
         let end = new Date(this.end_date)
         end.setHours(3,0,0)
         startDate=start.toISOString().replace(".000Z","")
         endDate = end.toISOString().replace(".000Z","")

       } else if (this.selected_period !== 1){
         console.log(this.selected_period)
         const period = getPeriod(this.selected_period)
         if (period.start){
           startDate = period.start.replace(".000Z","")
         }
         if (period.end){
           endDate = period.end.replace(".000Z","")
         }

       }
        let resp = await GetStat(this.token, startDate, endDate,this.forPair)
        this.stat = resp.data
   },

   
  },
  async mounted(){
    this.pairOptions=[
      {value:this.botSettings.Symbol_1, text:this.botSettings.Symbol_1},
      {value:this.botSettings.Symbol_2, text:this.botSettings.Symbol_2}
    ]
    this.forPair = this.botSettings.Symbol_1
   if (this.botSettings.Symbol_1){
     await this.calc()

   }


  },
  watch: {
    botSettings : async function(){
      this.forPair = this.botSettings.Symbol_1
      this.pairOptions=[
      {value:this.botSettings.Symbol_1, text:this.botSettings.Symbol_1},
      {value:this.botSettings.Symbol_2, text:this.botSettings.Symbol_2}
    ]
    if (this.botSettings.Symbol_1){
     await this.calc()

   }
    }
    
  },
 


}
</script>

<style scoped>


</style>
