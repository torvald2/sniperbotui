import Vue from 'vue'


export function GetToken(){
    return Vue.$cookies.get('APP_TOKEN')
}

export function SetToken(token){
     Vue.$cookies.set('APP_TOKEN', token)
}

export function DeleteToken(){
    Vue.$cookies.remove('APP_TOKEN')
}

