
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
        body: body
    })
    console.log(resp)
    const data = await resp.json()
    if (data.status === true){
        return {token:data.user.jwtToken, name:data.user.name}
    }
    else {
        return {error:data.message}
    }
}

export async function GetState(token){
    const resp = await fetch(setURL("/api/v1/BotState"),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`
        }
    })
    const data = await resp.json()

    return [data, resp.status]

}

export async function GetSettings(token){
    console.log(token)
    return await new Promise((resolve)=>{
        resolve({
            listenForListings:false,
            listenForFixedListings:true,
            baseSymbols:[
                {id:"BTC",checkedForListing:true},
                {id:"USDT", checkedForListing:false},
                {id:"DOGE",checkedForListing:false}
            ],
            pairs:[
                {base:"USDT", quote:"CHTX"}
            ]
            
        })
    })

}

export async function GetFututeListings(token){
    console.log(token)
    return await new Promise((resolve)=>{
        resolve(["YIN","OLY","CHTX","NUM","POC","GENE","CRA","GOLD","MYRA","DRATE","NTX","MELD","IONX"])
    })

}

export async function SaveSettings(token,settings){
    const resp = await fetch(setURL("/api/v1/AllSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(settings)

    })
    const data = await resp.json()
    return [data, resp.status]
}

export async function SaveExchangeSettings(token, apiKey, secretKey){
    const resp = await fetch(setURL("/api/v1/AllSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ApiKey:apiKey,
            SecKey:secretKey
        })

    })
    const data = await resp.json()
    return [data, resp.status]
}

export async function SavePairSettings(token, pair_1, pair_2, is_demo){
    const resp = await fetch(setURL("/api/v1/AllSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            IsDemoAccount:is_demo,
            Symbol_1:pair_1,
            Symbol_2:pair_2
        })

    })
    const data = await resp.json()
    return [data, resp.status]
}

export async function GetAlertSettings(token){
    const resp = await fetch(setURL("/api/v1/AlertSettings"),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`
        }
    })
    return await resp.json()
}

export async function GetSymbols(token){
    const resp = await fetch(setURL("/api/v1/symbols"),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`
        }
    })
    return await resp.json()
}


export async function SaveAlertSettings(token,settings){
    const resp = await fetch(setURL("/api/v1/AlertSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(settings)

    })
    const data = await resp.json()
    return [data, resp.status]
}

export async function SaveTelegaSettings(token,telegramId){
    const resp = await fetch(setURL("/api/v1/AlertSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({TelegramID:telegramId})

    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
}

export async function SaveMailSettings(token,email){
    const resp = await fetch(setURL("/api/v1/AlertSettings"),{
        method:"PATCH",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({EmailAddress:email})

    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
}

export async function StartBot(token){
    const resp = await fetch(setURL("/api/v1/execute"),{
        method:"POST",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({Command:"start"})

    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 202}
}

export async function StopBot(token){
    const resp = await fetch(setURL("/api/v1/execute"),{
        method:"POST",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({Command:"stop"})

    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 202}
}

export async function CalcelOrders(token, method,symbol){
    const resp = await fetch(setURL("/api/v1/execute"),{
        method:"POST",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({Command:"cancel_orders", Params: { Type: method, Symbol: symbol } })

    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 202}
}

export async function GetLogs(token, page, sortBy, sortDesk, filter){
    let url = `/api/v1/logs?page=${page}`

    if (sortBy){
        url = url + `&ordering=${sortDesk ? "-":""}${sortBy}`
    }
    if (filter){
        url = url+ `&search=${filter}`
    }


    const resp = await fetch(setURL(url),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,
        },
    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}

}

export async function GetLogEvents(token,next){
    let url = setURL("/api/v1/LogEvents")
    if (next){
        url = next
    }
    const resp = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,
        },
    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
}

export async function GetOrders(token, page,status,filters, sortBy, sortDesk){
    let url = `/api/v1/MainOrdersData?page=${page}&Status=${status}`

    if (filters.ClientOrderId){
        url = url + `&ClientOrderId=${filters.ClientOrderId}`
    }
    if (filters.CreatedAt_after){
        url = url+ `&CreatedAt_after=${filters.CreatedAt_after}`
    }
    if (filters.CreatedAt_before){
        url = url+ `&CreatedAt_before=${filters.CreatedAt_before}`
    }
    if (filters.Side){
        url = url+ `&Side=${filters.Side}`
    }
    if (filters.Type){
        url = url+ `&Type=${filters.Type}`
    }
    if (filters.UpdatedAt_after){
        url = url+ `&UpdatedAt_after=${filters.UpdatedAt_after}`
    }
    if (filters.UpdatedAt_before){
        url = url+ `&UpdatedAt_before=${filters.UpdatedAt_before}`
    }
    if (sortBy){
        url = url + `&ordering=${sortDesk ? "-":""}${sortBy}`
    }

    const resp = await fetch(setURL(url),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,

        },
    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
   
}


export async function GetHadgeOrder(token, order){
    let url = `/api/v1/HedgeOrdersData/${order}/`

    const resp = await fetch(setURL(url),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,
        },
    })
    const data = await resp.json()
    return {data:data, isOk:resp.status === 200}
}

export async function GetFilledOrdersCount(token){
    let url = `/api/v1/MainOrdersData/?Status=Filled`

    const resp = await fetch(setURL(url),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,
        },
    })
    const data = await resp.json()
    return {data:data.count, isOk:resp.status === 200}
}

export async function GetCanceledOrdersCount(token){
    let url = `/api/v1/MainOrdersData/?Status=Canceled`

    const resp = await fetch(setURL(url),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`,
        },
    })
    const data = await resp.json()
    return {data:data.count, isOk:resp.status === 200}
}

export async function GetStat(token, startDate, endDate,symbol){
    let url = setURL("/api/v1/CalcStat")
    const resp = await fetch(url,{
        method:"POST",
        headers:{
            "Authorization":`Token ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "StatParams": {
              "BeginTime": startDate,
              "EndTime": endDate,
              "Symbol": symbol
            }
          })
    })
    const data = await resp.json()
    return {data:data.Result, isOk:resp.status === 202}
}