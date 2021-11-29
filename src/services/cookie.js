import Vue from 'vue'


export function GetToken(){
    return Vue.$cookies.get('JWT')
}

export function SetToken(token,creds){
     Vue.$cookies.set('JWT', token)
     Vue.$cookies.set('USER_DATA', creds)
}

export function GetUserData() {
    return Vue.$cookies.get('USER_DATA')
    
}

export function DeleteToken(){
    Vue.$cookies.remove('JWT')
    Vue.$cookies.remove('USER_DATA')
}

