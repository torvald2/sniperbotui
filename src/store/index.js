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
    autoBids:[
      {date:"2021-10-14T16:45:05.435Z",
      exchange:"Gate.io",pair:{base:"BTC", quote:"USDT", url:"https://www.gate.io/ru/trade/BTC_USDT"},
      price:null,
      value:null,
      profit:null,
      id: 1,
      active:true
      },
      {date:"2021-10-15T16:45:05.435Z",
      exchange:"Binance",pair:{base:"ETH", quote:"USDT", url:"https://www.binance.com/ru/trade/ETH_USDT"},
      price:3.1415,
      value:45234,
      profit:1233232,
      saled_percent:30,
      profit_percent:13,
      id:2,
      active:true
      
      },
      {date:"2021-09-15T16:45:05.435Z",
      exchange:"Binance",pair:{base:"DOGE", quote:"USDT", url:"https://www.binance.com/ru/trade/ETH_USDT"},
      price:3.1415,
      value:45234,
      profit:-1233232,
      saled_percent:30,
      profit_percent:13,
      id:3,
      active:false
      
      }

  ]

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
    tickers: ()=> ["BTC","USDT","ETH","BUSDT"],
    getAutoBids: state => filters => {
      let result = []
      if (filters.isActive){
        result = state.autoBids.filter(item => item.active === filters.isActive)
      }
      return result
    }
    
  },
})
