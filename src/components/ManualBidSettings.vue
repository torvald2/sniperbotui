<template lang="pug">
article
  b-row
    b-col
      b-card(title="Основные")
        b-row
          b-col
            | Биржа
          b-col
            | Валюта (Базовая)
          b-col
            | 
        b-row.mt-1
          b-col
            b-form-select(size="sm" :options="exchngeOptions" :v-model="currentOpts.exchange")
          b-col
            b-form-select(size="sm" :options="selectedExchangeBaseSymbolsOpthions" v-model="currentOpts.baseSymbol")
          b-col
            b-form-checkbox(size="sm" v-model="currentOpts.autoSwitchAvalibeBalances") Авто переключение на доступые балансы
        b-row.mt-1
          b-col
            | Токен
          b-col
            | Макс. обьем позиции
          b-col
            | 
        b-row.mt-1
          b-col
            b-form-input(size="sm" list="quote_list" v-model="currentOpts.quoteSymbol")
          b-col
            b-input-group(size="sm")
              b-form-input(size="sm" type="number" v-model="currentOpts.maxVolume")
              b-input-group-append
                b-form-select(size="sm" :options="maxVolumeValueOptions" v-model="currentOpts.maxVolumeValue")
          b-col
            b-form-checkbox(size="sm" v-model="currentOpts.disabledWhenAuto")
              | Не делать закупку если сработала авто закупка
  b-row
    b-col
      b-card(title="Закупка")
        b-row
          b-col(cols="4")
            | Стратегия
          b-col(cols="4")
            b-form-select(:options="strategyOptions" v-model="currentOpts.buyStrategy.strategy")
        b-row.mt-1
          b-col(cols="4")
            | Тип ордера
          b-col(cols="4")
            b-form-select(size="sm" :options="ord_type_options" v-model="currentOpts.buyStrategy.orderType")
          b-col(cols="2").mr-0
            | Исполнение
          b-col(cols="2")
            b-form-select(size="sm" :options="executeOptions" v-model="currentOpts.buyStrategy.execution")
        b-row.mt-1
          b-col(cols="4")
            | Макс. цена
          b-col(cols="4")
            b-input-group(append="USD" size="sm")
              b-form-input(type="number" size="sm" v-model="currentOpts.buyStrategy.maxPrice")
          b-col(cols="2")
            | Макс. спред
          b-col(cols="2")
            b-input-group(size="sm")
              b-form-input(type="number" size="sm" v-model="currentOpts.buyStrategy.maxSpred")
              b-input-group-append
                b-form-select(size="sm" v-model="currentOpts.buyStrategy.maxSpredValue" :options="maxSpredValueOpts")
        b-row.mt-1
          b-col
            | Если цена опуститься ниже цены открытия первого ордера, тогда:
        b-row.mt-1
          b-col(cols="4")
            b-form-select(size="sm" :options="ifPriceDownOptions" v-model="currentOpts.buyStrategy.ifPriceDown")
          b-col(v-if="currentOpts.buyStrategy.ifPriceDown==='buy'" )
            | Стратегия ММ
          b-col(v-if="currentOpts.buyStrategy.ifPriceDown==='buy'")
            b-form-select(size="sm" :options="mmStrategyOptions" v-model="currentOpts.buyStrategy.mmStrategy")
  b-row
    b-col
      b-card
        template(#header)
          b-form-checkbox(switch v-model="currentOpts.sellStrategy.salesEnabled") Продажи
        b-row.mt-2.mr-0
          b-col(cols="3")
            | Тип ордера
          b-col(cols="3").p-0
            b-form-select(size="sm" :options="ord_type_options" v-model="currentOpts.sellStrategy.orderType")
          b-col(cols="3").pr-1.m-0
            | Стратегия
          b-col(cols="3").mr-0.pr-0
            b-form-select(size="sm" :options="sellStrategyOptions" v-model="currentOpts.sellStrategy.strategy")
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
        b-row(v-for="level in currentOpts.sellStrategy.sellLevels" :key="level.id").mt-2
          b-col(cols="2")
            | {{level.id}}
          b-col(cols="5")
            b-form-input(:value="level.mult" type="number" size="sm")
          b-col(cols="5")
            b-form-input(:value="level.value" type="number" size="sm")
        hr
        b-row
          b-col(cols="1")
            b-form-checkbox(switch  size="lg" v-model="currentOpts.sellStrategy.sellAllWhenPriceDown")
          b-col
            | Продать остаток объема если цена опуститься на
          b-col(cols="3")
            b-input-group(size="sm"  append="%")
              b-form-input(size="sm" type="number" v-model="currentOpts.sellStrategy.sellAllWhenPriceDownValue" )



</template>

<script>
import {  mapState} from 'vuex'
export default {
  name: "AutoBidSettings",
  props:["exchange_id"],
  data(){
    return {
      currentOpts:{},
      maxVolumeValueOptions:[
        {value:"percent",text:"%"},
        {value:"sum",text:"сумма"}
      ],
      strategyOptions:[
        {value:"max_value", text:"Набрать максимальный обьем"},
        {value:"min_slice",text:"Уменьшить проскальзывание"},
        {value:"min_price",text:"Наименьшая цена покупки"}
      ],
      sellStrategyOptions:[
        {value:"max_value", text:"Продать максимальный обьем"},
        {value:"min_slice",text:"Уменьшить проскальзывание"},
        {value:"max_price",text:"Наибольшая цена продажи"}

      ],
      ord_type_options:[
        {value:"auto",text:"авто выбор"},
        {value:"market", text:"Маркет"},
        {value:"limit",text:"Лимит"}
      ],
      executeOptions:[
        {value:"GTC",text:"Good-Till-Cancel(GTC)"},
        {value:"IOC", text:"Immediate-Or-Cancel(IOC)"},
        {value:"FOK",text:"Fill-Or-Kill (FOK)"}
      ],
      maxSpredValueOpts:[
        {value:"usd",text:"$"},
        {value:"percent", text:"%"},
      ],
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
      blacklist:[]
     
    }
  },
  computed:{
    ...mapState(["exchanges"]),
    selectedExchangeOptions(){
      if (this.selectedExchange){
        return this.$store.getters.getExchangeById(this.selectedExchange)
      }
      return null

    },
    selectedExchangeBaseSymbolsOpthions(){
      const data = []
      let selectedEx = this.$store.getters.getExchangeById(this.currentOpts.exchange)
      if (this.selectedExchange){
        for (let s of selectedEx.balances){
          data.push({value:s.name, text:`${s.name}(${s.value}$)`})
        }
        return data
        
      }
      return []
    },
    
    exchngeOptions(){
      const data = []
      for (let ex of this.exchanges){
        data.push({value:ex.id,text:ex.name})
      }
      return data
    },


  },
  methods:{
    getExchangeById(id){
      return this.$store.getters.getExchangeById(id)
    },
    addLevel(){
      let last_id = 0
      this.currentOpts.sellStrategy.sellLevels.forEach(x=> {
        if (x.id > last_id){
          last_id = x.id
        }
      })
      this.currentOpts.sellStrategy.sellLevels.push({
        id:last_id+1,
        mult:0,
        value:0
      })
    },
    getExchangeOptions(){
      if (this.exchange_id){
       const data = this.$store.getters.getManualBidById(this.exchange_id)
       Object.assign(this.currentOpts, data[0])
       }
       else {
         this.currentOpts =   {
        id:0,
        exchange:1,
        baseSymbol:"BTC",
        autoSwitchAvalibeBalances:true,
        quoteSymbol:"ETH",
        maxVolume:50,
        maxVolumeValue:"percent",
        disabledWhenAuto:true,
        buyStrategy:{
          strategy:"maxValue",
          orderType:"limit",
          execution:"GTC",
          maxPrice:10,
          maxSpred:1,
          maxSpredValue:"percent",
          ifPriceDown:"buy",
          mmStrategy:"firstOrderVolume"
        },
        sellStrategy: {
          salesEnabled:true,
          orderType:"limit",
          strategy:"selMaxValue",
          sellLevels:[
            
          ],
          sellAllWhenPriceDownValue:5,
          sellAllWhenPriceDown:true
       },

      }
       }
       
      
    
    },
    copySettings(){
      if (this.copyFromExchange){
        const data = this.$store.getters.getAutoBidSettingsById(this.selectedExchange)
        if (data.length ===0){
          window.alert("У выбранной биржи нет настроек")
        }
        else {
           Object.assign(this.currentOpts, data[0])
        }
      }

    }

    },
    created(){
      this.getExchangeOptions()
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

</style>