import Vue from 'vue'
import Vuex from 'vuex'
import {GetToken, SetToken, DeleteToken} from "../services/cookie"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",
    login:"",
    autoBidSettings:{
      active:true,
      main:[
        {exchange:1, param:1, value:55, symbol:"USDT", active:true},
        {exchange:2, param:2, value:334, symbol:"BUSDF", active:false}
      ],
      buyStrategy: {strategy:"max_value", orderType:"limit", execution:"GTC", maxPrice:10, ifPriceDown:"buy", priceDownStrategy:"first_value"},
      sellStrategy: {orderType:"limit",strategy:"selMaxValue",
                    sellLevels:[
                      {id:1, factor:2,percent:50},
                      {id:2, factor:3, percent:20},
                      {id:3, factor:4, percent:30}
                    ]
       },
       blackListed:["BTC", "ETH"]
      
    },
    exchanges:[
      {name:"binance",id:1,balances:[{name:"USDT", value:123456},{name:"BUSDF", value:53494},{name:"DAI",value:"3000"}]},
      {name:"gate.io",id:2,balances:[{name:"USDT", value:33422},{name:"BUSDF", value:42331}]}

    ],

  },
  mutations: {

    deleteToken(state){
      state.token = ""
    },
    
    addToken(state, data ){
      state.token = data[0]
      state.login = data[1]
    },
    clearCreds(state){
      state.token = ""
      state.login = ""
      DeleteToken()
    },
    readToken(state){
      let data = GetToken()
      if (data){
        state.token = data.token
        state.login = data.login
      }
    }, 
    setToken(state,data){
      SetToken(data.token)
      state.token = data.token
      state.login = data.login
    },
    
  

  },
  actions: {

    
  },
  getters: {
    isAuthorized: state => state.token.length > 0,
    profit: () => {return {manualProfit:128456.78, manualBidCount:10, autoBidCount:4, autoProfit:-123458.48}},
    getExchangeById: state => id => state.exchanges.filter(item=> item.id === id)[0],
    tickers: ()=> ["BTC","USDT","ETH","BUSDT"]
    
  },
})
