<template lang="pug">
b-card
  b-row(align-h="start")
    b-col(cols="1" align-self="center")
      | Биржа
    b-col(cols="2" align-self="center")
      b-form-select(:options="exchangeOpts" v-model="exchange" size="sm")
    b-col(cols="1" align-self="center")
      label За период
    b-col(cols="2" align-self="center")
      b-form-select(:options="period_values" v-model="selectedPeriod" size="sm")
    b-col(v-if="selectedPeriod===7" cols="1" align-self="center")
      | С
    b-col(v-if="selectedPeriod===7" cols="2" align-self="center")
      b-form-input(v-model="startDate" type="date" size="sm")
    b-col(v-if="selectedPeriod===7" cols="1" align-self="center")
      | По
    b-col(v-if="selectedPeriod===7" cols="2" align-self="center")
      b-form-input(v-model="endDate" type="date" size="sm")
  b-row(align-h="start").mt-2
    b-col(cols="1" align-self="center")
      | Тикер
    b-col(cols="2" align-self="center")
      b-input-group(size="sm")
        template(#append)
          b-button(disabled size="sm" variant="primary")
            b-icon(icon="search" size="sm")
        b-form-input(size="sm" list="filter-tickers-list" v-model="ticker")
    b-col(cols="1" align-self="center")
      | Прибыльность
    b-col(cols="2" align-self="center")
      b-form-select(:options="profit_values" v-model="profit" size="sm")
    b-col(cols="1" align-self="center")
      | Состояние
    b-col(cols="2" align-self="center")
      b-form-select(:options="status_values" v-model="status" size="sm")
    b-col(cols="1" align-self="center")
      b-button(variant="success")
        b-icon(icon="check-circle")
    
      

  datalist(id="filter-tickers-list")
    option(v-for="item in tickers" :key="item")
      | {{item}}

      
    

</template>

<script>
import {mapState,mapGetters} from "vuex"
export default {
  name: "Filterbid",
  data(){
    return{
      status:"",
      exchange:0,
      ticker:"",
      profit:"",
      period_values:[
        {value:1, text:"Все время"},
        {value:2, text:"Сегодня"},
        {value:3, text:"Вчера"},
        {value:4, text:"За 7 дней"},
        {value:5, text:"За 15 дней"},
        {value:6, text:"За 1 мес."},
        {value:7, text:"Задать произвольно"},
        ],
      selectedPeriod: 1,
      startDate:null,
      endDate:null,
      profit_values:[
        {value:"",text:"Любая"},
        {value:"prifitable",text:"Прибыльные"},
        {value:"losses",text:"Убыточные"}
      ],
      status_values:[
        {value:"",text:"Все"},
        {value:"waiting",text:"В ожидании"},
        {value:"byed",text:"Закуплено"}
      ]
    }
  },
  computed:{
      ...mapState(["exchanges"]),
      ...mapGetters(["tickers"]),
      exchangeOpts(){
          const opts=[]
          for (let ex of this.exchanges){
              opts.push({value:ex.id, text:ex.name})
          }
          return opts

      }
  },

  methods:{
    
  }
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