import Vue from 'vue'
import Vuex from 'vuex'
import {GetToken, SetToken, DeleteToken} from "../services/cookie"
import {GetSettings,GetFututeListings} from "../services/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",
    login:"",
    botSettings:{},
    futureListings:[]
    


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
    setBotSettings(state,settings){
      state.botSettings = settings
    },
    setListenForListings(state, val){
      state.botSettings.listenForListings=val
      state.botSettings.listenForFixedListings=!val
    },
    setListenForFixedListings(state, val){
      state.botSettings.listenForListings=!val
      state.botSettings.listenForFixedListings=val
    },
    setSymbolValue(state, payload){
      state.botSettings.baseSymbols[payload.id][payload.key] = payload.val
    },
    setFutureListings(state,payload){
      state.futureListings = payload
    },
    addPair(state,pair){
      state.botSettings.pairs.push(pair)
    },

  

  },
  actions: {
    async getBotSettings(context){
      context.commit("setBotSettings", await GetSettings(context.state.token))
    },
    async actFutureListings(context){
      context.commit("setFutureListings", await GetFututeListings(context.state.token))
    },
    
  },
  getters: {
    isAuthorized: state => state.token.length > 0,
    
  },
})
