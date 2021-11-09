<template lang="pug">
article
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
      b-col(cols="2")
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
      b-col(cols="2")
        | Тип ордера
      b-col(cols="4")
        b-form-select(size="sm")
          b-form-select-option
            | Авто выбор
          b-form-select-option
            | Маркет
          b-form-select-option
            | Лимит
      b-col(cols="2")
        | Исполнение
      b-col(cols="4")
        b-form-select(size="sm")
          b-form-select-option
            | Good-Till-Cancel(GTC)
          b-form-select-option
            | Immediate-Or-Cancel(IOC)
          b-form-select-option
            | Fill-Or-Kill (FOK)
    b-row.mt-2
      b-col(cols="2")
        | Макс. цена закупки
      b-col(cols="4")
        b-form-input(type="number" size="sm")
    b-row.mt-2
      b-col
        | Если цена опуститься ниже цены открытия первого ордера, тогда:
    b-row.mt-2

         
        
        
              
            
        
        
      
        
</template>

<script>
import {  mapState} from 'vuex'
export default {
  name: "AutoBidSettings",
  data(){
    return {
     
    }
  },
  computed:{
    ...mapState(["autoBidSettings"]),

    
 
  },
  methods:{
    getExchangeById(id){
      return this.$store.getters.getExchangeById(id)
    },
    
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