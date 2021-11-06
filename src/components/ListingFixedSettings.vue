<template lang="pug">
b-container
  b-row.mt-2
    b-col
      b-form-checkbox(@change="value => onCheckListing(value)" :checked="botSettings.listenForListings" switch size="lg") Обнаруживать новые листинги

    b-col
      b-form-checkbox(@change="value => onCheckFixed(value)" :checked="botSettings.listenForFixedListings" switch size="lg") Указать принудительно 
    
  b-row.mt-2
    b-col
      b-form(inline)
        label.mr-2 Base
        b-form-select(v-model="baseSymbolCurrent" :options="baseSymbols" size="sm").mr-2
        label.mr-2(v-if="botSettings.listenForFixedListings") Quote
        b-form-input(list="quotedDatalist" v-model="currentQuote" size="sm" v-if="botSettings.listenForFixedListings").mr-2
        b-button(variant="primary" size="sm" @click="pairAdd")
          b-icon(icon="plus")

    b-col
      b-form(inline)
        label.mr-2 Тип ордера
        b-form-select(v-model="orderType" :options="['market','limit']" size="sm").mr-2
        b-form-select(:options="[1,2,3,4,5,6,7,8,9,10]" size="sm" v-if="orderType==='limit'").mr-2
        label(v-if="orderType==='limit'") Политика исполнения
        b-form-select(:options="['GTC','IOC','FOK']" size="sm" v-if="orderType==='limit'").mr-2

  hr
  b-row
    b-col
      b-row
        b-col
          | Base
        b-col(v-if="botSettings.listenForFixedListings")
          | Quote
        b-col
          | Buy min
        b-col
          | Buy max
        b-col
          | Тип обьема
        b-col(v-if="fixedVal==='fixed'")
          | Обьем
        b-col(v-if="fixedVal==='random'")
          | Обьем мин
        b-col(v-if="fixedVal==='random'")
          | Обьем мах
        b-col
          | 
      hr
      b-row(v-for="pair in botSettings.pairs").mt-2
        b-col
          | {{pair.base}}
        b-col(v-if="botSettings.listenForFixedListings")
          | {{pair.quote}}
        b-col
          b-form-input(size="sm")
        b-col
          b-form-input(size="sm")
        b-col
          b-form-select(v-model="fixedVal" :options="['fixed','random']" size="sm").mr-2
        b-col
          b-form-input(size="sm")
        b-col(v-if="fixedVal==='random'")
          b-form-input(size="sm")
        b-col
          b-button(variant="danger" size="sm")
            b-icon(icon="trash")

        
  datalist(id="quotedDatalist")
    option(v-for="data in futureListings") {{data}}
  

</template>

<script>
import {  mapState, mapMutations} from 'vuex'
export default {
  name: "ListingFixedSettings",
  data(){
    return {
        baseSymbolCurrent:null,
        currentQuote:"",
        fixedVal:"fixed",
        orderType:"market"
    }
  },
  computed:{
    ...mapState(["botSettings","futureListings"]),
    baseSymbols(){
        const res = []
        for (let s of this.botSettings.baseSymbols){
            res.push({value:s.id, text:s.id})
        }
        return res
    }
 
  },
  methods:{
    ...mapMutations(["addPair", "setListenForFixedListings","setListenForListings"]),
    pairAdd(){
        this.addPair({base:this.baseSymbolCurrent, quote:this.currentQuote})
    },
    onCheckListing(val){
        this.setListenForListings(val) 
    },
    onCheckFixed(val){
        this.setListenForFixedListings(val) 
    },

  },

}
</script>

<style scoped>

hr {

  height:8px;
  margin-top: 10px;
  padding-top: 0px;
  margin-bottom: 10px;
}

</style>