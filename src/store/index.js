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
    
  

  },
  actions: {

    
  },
  getters: {
    isAuthorized: state => state.token.length > 0,
    profit: state => {manualProfit:12845678, manualBidCount:10, autoBidCount:4, autoProfit:-12345848}
    
  },
})
