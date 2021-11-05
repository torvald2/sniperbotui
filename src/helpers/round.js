export default function(num, decimals) {
    let x = parseInt(`1${new Array(decimals + 1).join("0")}`)
    if (x<100){
        x = 100
    }
    return Math.round((num + Number.EPSILON) * x) / x
}