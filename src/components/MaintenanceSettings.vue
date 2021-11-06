<template lang="pug">
div
  b-row.mt-2
    b-col(cols="2")
      | Если цена станет ниже зоны закупки
    b-col
      b-list-group
        b-list-group-item
          b-form(inline)
            label.mr-2 Если цена CHTX опустится ниже диапазона покупок, тогда:
            b-form-select(:options="buyOpts" size="sm" v-model="buy").mr-2
            label(v-if="buy==='continue'").mr-2 Увеличить объем ордера на
            b-form-input(size="sm" v-if="buy==='continue'")
  b-row.mt-2
    b-col(cols="2")
      | Если цена станет выше зоны закупки
    b-col
      b-list-group
        b-list-group-item
          b-row
            b-col(cols="5")
              label.mr-2 Если цена CHTX выше диапазона покупок, тогда
            b-col(cols="2")
               b-form-select(:options="selOpts" size="sm" v-model="sell").mr-2
            b-col               
              b-row.mt-2
                b-col
                  b-form-select(:options="selTrigerOpts" size="sm" v-if="sell==='sell'" v-model="trigerOpt").mr-2
                b-col
                  b-form-input(size="sm" v-if="sell==='sell'")
              b-row.mt-2
                b-col
                  label(v-if="sell==='sell'").mr-2 Обьем
                b-col
                  b-input-group(append="%" size="sm" v-if="sell==='sell'")
                    b-form-input
              b-row.mt-2
                b-col(cols="1")
                  label(v-if="sell==='sell'").mr-2 Тип
                b-col(cols="4")
                  b-form-select(:options="orderTypes" v-model="orderType" size="sm" v-if="sell==='sell'").mr-2
                b-col(cols="4")
                  label(v-if="sell==='sell' && orderType==='market'") Макс размер
                  label(v-if="sell==='sell'  && orderType==='limit'" ) Уровень
                b-col
                  b-input-group(append="%" size="sm" v-if="sell==='sell'  && orderType==='market'")
                    b-form-input
                  b-form-select(:options="[1,2,3,4,5,6,7,8,9,10]" size="sm" v-if="sell==='sell'  && orderType==='limit'").mr-2
                  
                  


   
  </b-input-group>
    



            
        
</template>

<script>
import {  mapState, mapMutations} from 'vuex'
export default {
  name: "MaintenanceSettings",
  data(){
    return {
     buyOpts:[{value:"stop",text:"Остановить покупки"},{value:"continue",text:"Продолжить покупки"}],
    selOpts:[{value:"wait",text:"Ничего не делать"},{value:"sell",text:"Продать монету"}],
    selTrigerOpts:[{value:"price",text:"Цена >"},{value:"marge",text:"множить прибыли"}],
    orderTypes:[{value:"market",text:"рыночный"},{value:"limit",text:"лимитный"}],

     buy:"stop",
     sell:"wait",
     orderType:"market",
     trigerOpt:"price"
    }
  },
  computed:{
    ...mapState(["botSettings"]),
    basSymbolsSorted(){
      if (this.botSettings.baseSymbols){
        const pairs = [[]]
      let added = 0
      let current = 0
      for (let val of this.botSettings.baseSymbols){
        if (added>1){
          pairs.push([])
          current ++
          added = 0
        }
        pairs[current].push(val)
        added++
      }
      return pairs
      } else {
        return []
      }
      
      

    }
 
  },
  methods:{
    ...mapMutations(["setListenForListings", "setSymbolValue"]),
    onListenCheck(val){
      this.setListenForListings(val)      
    },
    onSymbolCheck(val,id){
      this.setSymbolValue({id:id, key:"checkedForListing", val:val})
    }
  },

}
</script>

<style scoped>



</style>