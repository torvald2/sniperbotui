import Vue from 'vue'
import Vuex from 'vuex'
import {GetToken, DeleteToken,GetUserData, } from "../services/cookie"
import {GetExchanges, GetKeys, GetAccountTypes} from "../services/api"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Login data
    token:"",
    login:"",
    email:"",
    
    //MasterData
    exchanges:[],
    keys:[], 
    accounts:[]

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
    addExchangesList(state,payload){
      state.exchanges = payload
    },
    addKeys(state, payload){
      state.keys = payload
    },
    addAccount(state,payload){
      console.log("Pushing", payload.id)
      state.accounts.push(payload)
    }

  },
  actions: {
    async getExchangeList(state){
      const res = await GetExchanges()
      if (res.isOk) {
        state.commit("addExchangesList",res.data)

      }
    },
    async getKeys(state){
      const res = await GetKeys()
      if (res.isOk) {
        state.commit("addKeys",res.data)

      }
    },
    async getAllAccounts(state){
      for (const key of state.state.keys){
        let data = await GetAccountTypes(key.id)
        state.commit("addAccount",data.data)
      }
    }


    
  },
  getters: {
    isAuthorized: state => state.token.length > 0,
    
  },
})
