import Vue from 'vue'
import Vuex from 'vuex'
import {GetState, GetSettings, GetAlertSettings, GetSymbols, GetLogEvents, GetFilledOrdersCount, GetCanceledOrdersCount} from "../services/api"
import {GetToken, SetToken, DeleteToken} from "../services/cookie"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error:"",
    token:"",
    login:"",
    botIsLaunched:false,
    ticks:[],
    openOrders:[],
    balances:[],
    botSettings:{},
    apiKey:"",
    apiSecret:"",
    alertSettings:{},
    alertMail:"",
    alertTelegram:"",
    symbols:[],
    isOnline:false, 
    lastStateDate: 1,
    botState:{},
    logEvents:[],
    ordersCount:0,
    canceledOrdersCount:0


  },
  mutations: {
    setLogEvents(state, data){
      //Контролируем длину
      if (state.logEvents.length >100){
        state.logEvents.splice(state.logEvents.length-data.length, data.length)
      }
      state.logEvents = [...data, ...state.logEvents]
      state.logEvents.sort(function(a, b) {return b.id-a.id;})

    
    },
    deleteToken(state){
      state.token = ""
    },
    setOrdersCount(state, count){
      state.ordersCount = count.data
    },
    setCanceledOrdersCount(state, count){
      state.canceledOrdersCount = count.data
    },

    addToken(state, data ){
      state.token = data[0]
      state.login = data[1]
    },
    setBotState(state, botState){
      if ((botState[1])===200){
        state.botIsLaunched = botState[0].IsLaunched
        state.ticks = botState[0].TicksData
        state.openOrders =botState[0].OpenOrdersData
        state.balances = botState[0].BalancesData
        state.isOnline = true
        let upd = Date.now() - botState[0].UpdateTime
          state.lastStateDate = upd
        state.botState = botState[0]


      } else {
        state.isOnline = false
      }
      
    },
    clearCreds(state){
      state.token = ""
      state.login = ""
      DeleteToken()
    },
    setAppSettings(state, settings){
      state.botSettings = settings
      state.apiKey = settings.ApiKey
      state.apiSecret = settings.SecKey
      if (settings.RandomData){
        if (settings.RandomData.IsRand_Max_Orders){
          state.botSettings.IsRand_Max_Orders = settings.RandomData.IsRand_Max_Orders[2]
          state.botSettings.IsRand_Max_Orders_Min = settings.RandomData.IsRand_Max_Orders[0]
          state.botSettings.IsRand_Max_Orders_Max = settings.RandomData.IsRand_Max_Orders[1]
        }
        if (settings.RandomData.IsRand_Volume_Orders){
          state.botSettings.IsRand_Volume_Orders = settings.RandomData.IsRand_Volume_Orders[2]
          state.botSettings.IsRand_Volume_Orders_Min = settings.RandomData.IsRand_Volume_Orders[0]
          state.botSettings.IsRand_Volume_Orders_Max = settings.RandomData.IsRand_Volume_Orders[1]
        }
        if (settings.RandomData.IsRand_Spread_Deviation_Ask){
          state.botSettings.IsRand_Spread_Deviation_Ask = settings.RandomData.IsRand_Volume_Orders[2]
          state.botSettings.IsRand_Spread_Deviation_Ask_Min = settings.RandomData.IsRand_Spread_Deviation_Ask[0]
          state.botSettings.IsRand_Spread_Deviation_Ask_Max = settings.RandomData.IsRand_Spread_Deviation_Ask[1]
        }
        if (settings.RandomData.IsRand_Spread_Deviation_Bid){
          state.botSettings.IsRand_Spread_Deviation_Bid = settings.RandomData.IsRand_Volume_Orders[2]
          state.botSettings.IsRand_Spread_Deviation_Bid_Min = settings.RandomData.IsRand_Spread_Deviation_Bid[0]
          state.botSettings.IsRand_Spread_Deviation_Bid_Max = settings.RandomData.IsRand_Spread_Deviation_Bid[1]
        }
        if (settings.RandomData.IsRand_One_Order_Volume_Ask){
          state.botSettings.IsRand_One_Order_Volume = settings.RandomData.IsRand_One_Order_Volume_Ask[2]
          state.botSettings.IsRand_One_Order_Volume_Min = settings.RandomData.IsRand_One_Order_Volume_Ask[0]
          state.botSettings.IsRand_One_Order_Volume_Max = settings.RandomData.IsRand_One_Order_Volume_Ask[1]
        }

        if (settings.RandomData.IsRand_One_Order_Volume_Bid){
          state.botSettings.IsRand_One_Order_Volume_Bid = settings.RandomData.IsRand_One_Order_Volume_Bid[2]
          state.botSettings.IsRand_One_Order_Volume_Bid_Min = settings.RandomData.IsRand_One_Order_Volume_Bid[0]
          state.botSettings.IsRand_One_Order_Volume_Bid_Max = settings.RandomData.IsRand_One_Order_Volume_Bid[1]
        }
        if (settings.RandomData.IsRand_Price_Channel_Up){
          state.botSettings.IsRand_Price_Channel_Up = settings.RandomData.IsRand_Volume_Orders[2]
          state.botSettings.IsRand_Price_Channel_Up_Min = settings.RandomData.IsRand_Price_Channel_Up[0]
          state.botSettings.IsRand_Price_Channel_Up_Max = settings.RandomData.IsRand_Price_Channel_Up[1]

        }
        if (settings.RandomData.IsRand_Price_Channel_Down){
          state.botSettings.IsRand_Price_Channel_Down = settings.RandomData.IsRand_Volume_Orders[2]
          state.botSettings.IsRand_Price_Channel_Down_Min = settings.RandomData.IsRand_Price_Channel_Down[0]
          state.botSettings.IsRand_Price_Channel_Down_Max = settings.RandomData.IsRand_Price_Channel_Down[1]

        }

      }
    },
    setAlertSettings(state, settings){
      state.alertSettings = settings
      state.alertMail = settings.EmailAddress
      state.alertTelegram = settings.TelegramID
    },
    setSymbols(state, symbols){
      state.symbols = symbols
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
    async getBotState(context){
      try {
        const data = await GetState(context.state.token)
        context.commit("setBotState", data)
      } catch(e) {
        context.commit("setBotState", [undefined, 0])
        console.error(e)
      }
    },
    async GetOrdersCountMutation(context){
      context.commit("setOrdersCount", await GetFilledOrdersCount(context.state.token))
    },
    async GetCanceledOrdersCountMutation(context){
      context.commit("setCanceledOrdersCount", await GetCanceledOrdersCount(context.state.token))
    },
    async getAppSettings(context) {
      context.commit("setAppSettings", await GetSettings(context.state.token))
    },
    async getAlertSettings(context){
      context.commit("setAlertSettings", await GetAlertSettings(context.state.token))
    },
    async getAllSymbols(context){
      context.commit("setSymbols", await  GetSymbols(context.state.token))
    },
    async getShotLogs(context,next){
      const resp = await GetLogEvents(context.state.token,next)
      if (resp.isOk){
        let data = resp.data.results
        let newData = []
        for (const el of data){
          //Проверяем есть ли такой ID
          if (!context.state.logEvents.filter(row => row.id === el.id)[0]){
            newData.push(el)
          }
        }
        context.commit("setLogEvents", newData)
        if (context.state.logEvents.length <99 && resp.data.next){
           await context.dispatch("getShotLogs", resp.data.next)
        }
      } else {
        console.error("Не удалось загрузить логи")
      }
    }

  },
  getters: {
    isAuthorized: state => state.token.length > 0,
    mainPair : state => {
       const data = state.symbols.filter(pair => pair.Symbol === state.botSettings.Symbol_1)[0]
       return data ? data : {}
    },
    secondPair : state => {
      const data = state.symbols.filter(pair => pair.Symbol === state.botSettings.Symbol_2)[0]
      return data ? data :{}
    },
  },
})
