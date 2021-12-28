
//const apiHost = "https://sniperbot.botrex.net"
const apiHost = false
function setURL(endpoint){
    if(apiHost){
        return apiHost + endpoint
    }
    return endpoint
}

export async function GetToken(login, password){
    const url = setURL("/api/auth/login")
    const body = new URLSearchParams({
        "email":login,
        "password":password
    })
    const resp = await fetch(url,{
        method:"POST",
        body: body,
    })
    const data = await resp.json()
    if (data.status === true){
        return {token:data.user.jwtToken, 
                name:data.user.name
              }
    }
    else {
        return {error:data.message}
    }
}

export async function GetListings(limit, offset,filter,from, to, sort, sortDesk){
    let url = `/api/listings?limit=${limit}&offset=${offset}`

    if (filter){
        url = url + `&filter=${JSON.stringify(filter)}`
    }
    if (from){
        url = url+ `&dateFrom=${from.getTme()}`
    }
    if (to){
        url = url+ `&dateTo=${to.getTme()}}`
    }
    if (sort){
        url = url + `&sort=${sortDesk ? "-":""}${sort}`
    }

    const resp = await fetch(setURL(url),{
        method:"GET",  credentials: 'include'   })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
   
}


export async function  GetExchanges() {
    let url = `/api/exchanges/`
    const resp = await fetch(setURL(url),{ method:"GET",  credentials: 'include'   })
    const data = await resp.json()
    return {data:data.list, isOk:data.status}
    
}

export async function  GetKeys() {
    let url = "/api/botSettings/keys"
    const resp = await  fetch(setURL(url),{ method:"GET",  credentials: 'include'   })
    const data = await resp.json()
    return {data:data.items, isOk:data.status}
}

export async function GetAccountTypes(id) {
    let url = `/api/exchanges/accountTypes/${id}`
    const resp = await  fetch(setURL(url),{ method:"GET",  credentials: 'include'   })
    const data = await resp.json()
    if (data.status){
        return {data:{
            balance: data.balance.summaryInUSDT,
            accounts: data.accounts,
            types:data.types,
            id:id
        }
         }
}
    else {
        return {data:{id:id}}
    }
   
    
}
