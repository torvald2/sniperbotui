
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
        return {token:data.user.jwtToken, 
                name:data.user.name
              }
    }
    else {
        return {error:data.message}
    }
}

export async function GetSettings(token){
    const resp = await fetch(setURL("/api/v1/BotState"),{
        method:"GET",
        headers:{
            "Authorization":`Token ${token}`
        }
    })
    const data = await resp.json()

    return [data, resp.status]

}

