export default {
    filters:{
        formatSum: function (val) {
            let digit = new Intl.NumberFormat().format(val)
            let prefix = ""
            if (val >0){
                prefix = "+"
            }
            return prefix+digit
            
        }
    }
}