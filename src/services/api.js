
const apiHost = "https://sniperbot.botrex.net"
//const apiHost = false
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
        mode:"no-cors"
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

export async function GetAccounts(){
    const resp = await fetch(setURL("/api/botSettings/keys"),{
        method:"GET",
        credentials: 'include',
        mode:"no-cors"
    })
    const data = await resp.json()
    if (data.status){
        return data.items
    }

    return null
}

export async function  NewAccount(params) {
   const url = setURL("/api/botSettings/keys")
    const body = new URLSearchParams({
        "name":params.name,
        "exchange":params.exchange,
        "publicKey":params.publicKey,
        "privateKey":params.privateKey
    })
    const resp = await fetch(url,{
        method:"POST",
        body: body,
        mode:"no-cors"
    })
    const data = await resp.json()
    if (data.status === true){
        return {data:data.item}
    }
    else {
        return {error:data.error}
    }
}

export async function UpdateAccount(params) {
    const url = setURL("/api/botSettings/keys")
    const body = new URLSearchParams({
        "name":params.name,
        "exchange":params.exchange,
        "publicKey":params.publicKey,
        "privateKey":params.privateKey
    })
    const resp = await fetch(url,{
        method:"POST",
        body: body,
        mode:"no-cors"
    })
    const data = await resp.json()
    if (data.status === true){
        return {data:data.item}
    }
    else {
        return {error:data.error}
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
        method:"GET",
        mode:"no-cors"
    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
   
}