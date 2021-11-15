const mouths= ["января", "фервраля", "марта", "апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]


function round(num, decimals) {
    let x = parseInt(`1${new Array(decimals + 1).join("0")}`)
    if (x<100){
        x = 100
    }
    return Math.round((num + Number.EPSILON) * x) / x
}
export default {
    filters:{
        formatSum: function (val) {
            let digit = new Intl.NumberFormat().format(val)
            let prefix = ""
            if (val >0){
                prefix = "+"
            }
            return prefix+digit
            
        },
        formatDate: function (val) {
            let date = new Date(val)
            let year = date.getFullYear()
            let mNum = date.getMonth()
            let day = date.getDay()
            let hour = date.getHours()
            let minute = date.getMinutes()
            return `${day} ${mouths[mNum]} ${year} в ${hour}:${minute}`
        },
        formatPrice: function (val) {
            return round(val, 4)
            
        }
    }
}