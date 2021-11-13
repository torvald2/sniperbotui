<template lang="pug">
b-row
 b-col
  
  b-card(title="Основные")
    b-row
      b-col
        | Биржа
      b-col
        |
      b-col(cols="4")
        | Валюта (базовая)
      
      b-col(cols="4")
        | Макс. объем позиции
    hr
    b-row(v-for="row in autoBidSettings.main" :key="row.id")
      b-col
        | {{getExchangeById(row.exchange).name}}
      b-col
        b-form-checkbox(switch :checked="row.active" size="sm")
      b-col(cols="4")
        b-form-select(size="sm")
          b-form-select-option(v-for="item in getExchangeById(row.exchange).balances"
                               size="sm"
                               :disabled="!row.active"
                               :key="item.name"
                               )
            | {{item.name}}(${{item.value}})
      b-col(cols="4")
        b-input-group(size="sm" )
          b-form-input(type="number" :disabled="!row.active")
          b-input-group-append
            b-form-select(size="sm" :disabled="!row.active")
              b-form-select-option %
              b-form-select-option Сумма
  b-card(title="Условия закупки")
    b-row
      b-col(cols="4")
        |Стратегия
      b-col
        b-form-select(size="sm")
          b-form-select-option
            | Набрать максимальный обьем
          b-form-select-option
            | Уменьшить проскальзывание
          b-form-select-option
            | Наименьшая цена покупки
    b-row.mt-2
      b-col(cols="3")
        | Тип ордера
      b-col(cols="3").p-0
        b-form-select(size="sm")
          b-form-select-option
            | Авто выбор
          b-form-select-option
            | Маркет
          b-form-select-option
            | Лимит
      b-col(cols="3")
        | Исполнение
      b-col(cols="3").p-0
        b-form-select(size="sm")
          b-form-select-option
            | Good-Till-Cancel(GTC)
          b-form-select-option
            | Immediate-Or-Cancel(IOC)
          b-form-select-option
            | Fill-Or-Kill (FOK)
    b-row.mt-2
      b-col(cols="5")
        | Макс. цена закупки
      b-col(cols="4")
        b-form-input(type="number" size="sm")
    b-row.mt-2
      b-col
        | Если цена опуститься ниже цены открытия первого ордера, тогда:
    b-row.mt-2
      b-col(cols="4")
        b-form-select(size="sm" :options="ifPriceDownOptions" v-model="ifPriceDown")
      b-col(v-if="ifPriceDown==='buy'" cols="3").p-0.m-1
        | Стратегия ММ
      b-col(v-if="ifPriceDown==='buy'" cols="4")
        b-form-select(size="sm" :options="mmStrategyOptions" v-model="mmStrategy")
 b-col.m-0
  b-card(title="Условия продажи")
    b-row.mt-2.mr-0
      b-col(cols="3")
        | Тип ордера
      b-col(cols="3").p-0
        b-form-select(size="sm")
          b-form-select-option
            | Авто выбор
          b-form-select-option
            | Маркет
          b-form-select-option
            | Лимит
      b-col(cols="3").pr-1.m-0
        |Стратегия
      b-col(cols="3").mr-0.pr-0
        b-form-select(size="sm")
          b-form-select-option
            | Продать макс. обьем
          b-form-select-option
            | Уменьшить проскальзывание
          b-form-select-option
            | Наибольшая цена продажи
    hr
    b-row
      b-col(cols="4")
        |Уровни продажи
      b-col(cols="2")
        b-button(variant="primary" size="sm" @click="addLevel")
          b-icon(icon="plus")
    b-row.mt-2
      b-col(cols="2")
        | #
      b-col(cols="5")
        | Множитель
      b-col(cols="5")
        | Обьем
    b-row(v-for="level in saleLevels" :key="level.id").mt-2
      b-col(cols="2")
        | {{level.id}}
      b-col(cols="5")
        b-form-input(:value="level.mult" type="number" size="sm")
      b-col(cols="5")
        b-form-input(:value="level.value" type="number" size="sm")
    hr
    b-row
      b-col(cols="1")
        b-form-checkbox(switch  size="lg")
      b-col
        | Продать остаток объема если цена опуститься на
      b-col(cols="3")
        b-input-group(size="sm"  append="%")
          b-form-input(size="sm" type="number")
    b-row
      b-card(title="Черный список валют")
        b-form-tags(tag-variant="primary" tag-pills v-model="blacklist")
         
</template>

<script>
import {  mapState} from 'vuex'
export default {
  name: "AutoBidSettings",
  data(){
    return {
      ifPriceDownOptions:[
        {value:"doNothing",text:"Ничего не делать"},
        {value:"buy", text:"Делать дозакупки"}
      ],
      mmStrategyOptions:[
        {value:"firstOrderValue",text:"Изначальный обьем ордера"},
        {value:"increaseOrderValue", text:"Увеличить обьем ордера"},
         {value:"decreaseOrderValue", text:"Уменьшить обьем ордера"}
      ],
      ifPriceDown:"doNothing",
      mmStrategy:"firstOrderValue",
      saleLevels:[
        {id:1, mult:2, value:1000},
        {id:2, mult:22, value:10}
      ],
      blacklist:["BTC","ETH"]
     
    }
  },
  computed:{
    ...mapState(["autoBidSettings"]),

    
 
  },
  methods:{
    getExchangeById(id){
      return this.$store.getters.getExchangeById(id)
    },
    addLevel(){
      let last_id = 0
      this.saleLevels.forEach(x=> {
        if (x.id > last_id){
          last_id = x.id
        }
      })
      this.saleLevels.push({
        id:last_id+1,
        mult:0,
        value:0
      })
    }
    
  },

}
</script>

<style scoped>

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

</style>