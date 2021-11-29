import Vue from 'vue'
import Vuex from 'vuex'
import {GetToken, DeleteToken,GetUserData} from "../services/cookie"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",
    login:"",
    email:"",
    activeAutoBidSettings:true,
    autoBidSettings:[
      {
        exchange:1,
        balancesQty:1,
        buyStrategy: {
          baseSymbol:"BUSD",
          autoSwitchToAvaibleBalances:true,
          maxVolume:50,
          maxVolumeValue:"percent",
          dontBuyIfManualStraegyPresent:true,
          strategy:"max_value", 
          orderType:"limit",
          execution:"GTC",
          maxPrice:10,
          maxSpred:10,
          maxSpredValue:"percent",
          ifPriceDown:"buy",
          mmStrategy:"first_value"  
          },
          sellStrategy: {
            salesEnabled:true,
            orderType:"limit",
            strategy:"selMaxValue",
            sellLevels:[
                {id:1, factor:2,percent:50},
                {id:2, factor:3, percent:20},
                {id:3, factor:4, percent:30}
            ],
            sellAllWhenPriceDownValue:5,
            sellAllWhenPriceDown:true
         },
         blackListed:["BTC", "ETH"]
        
      },
    ],
    manualBidSettngs:[
      {
        id:1,
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
              {id:1, factor:2,percent:50},
              {id:2, factor:3, percent:20},
              {id:3, factor:4, percent:30}
          ],
          sellAllWhenPriceDownValue:5,
          sellAllWhenPriceDown:true
       },

      },
    ],
    accounts:[],
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
      active:true,
      avaliableValue:1000
      },
      {date:"2021-10-15T16:45:05.435Z",
      exchange:"Binance",pair:{base:"ETH", quote:"USDT", url:"https://www.binance.com/ru/trade/ETH_USDT"},
      price:3.1415,
      value:45234,
      profit:1233232,
      saled_percent:30,
      profit_percent:13,
      id:2,
      active:true,
      avaliableValue:100000
      
      },
      {date:"2021-09-15T16:45:05.435Z",
      exchange:"Binance",pair:{base:"DOGE", quote:"USDT", url:"https://www.binance.com/ru/trade/ETH_USDT"},
      price:3.1415,
      value:45234,
      profit:-1233232,
      saled_percent:30,
      profit_percent:13,
      id:3,
      active:false,
      avaliableValue:0
      
      }

  ]

  },
  mutations: {
    
    clearCreds(state){
      state.token = ""
      state.login = ""
      state.email = ""
      DeleteToken()
    },
    readToken(state){
      let token = GetToken()
      let login = GetUserData()
      if (token){
        state.token = token
        state.login = login.name
        state.email = login.email
      }
    }, 
  },
  actions: {
    // async setUserData(store){

    // }

    
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
    },
    getBidById: state => id => state.autoBids.filter(item => item.id === id)[0],
    getAutoBidSettingsById: state => id => state.autoBidSettings.filter(item => item.exchange === id),
    getManualBidById: state => id => state.manualBidSettngs.filter(item => item.id === id)
    
  },
})
