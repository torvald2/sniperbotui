
export default function FormatPeriod(period){
    let now = new Date()
    now.setHours(3,0,0) //To mignight
    let date2 = new Date()
    date2.setHours(3,0,0) //To mignight
    
    switch (period){
        case 1:
            return {}
        case 2: //Today
            return {start: now.toISOString(), end:null} 
        case 3: //Yesterday
            date2.setDate(date2.getDate()-1)
            return {start:date2.toISOString(), end:now.toISOString()}
        case 4: // 3 days
            date2.setDate(date2.getDate()-3)
            return {start:date2.toISOString(), end:null}
        case 5: // 7 days
            date2.setDate(date2.getDate()-7)
            return {start:date2.toISOString(), end:null}
        case 6: // 15 days
            date2.setDate(date2.getDate()-15)
            return {start:date2.toISOString(), end:null}
        case 7: // 1 mount
            date2.setDate(date2.getDate()-30)
            return {start:date2.toISOString(), end:null}
        case 8: // 3 mount
            date2.setDate(date2.getDate()-90)
            return {start:date2.toISOString(), end:null}
    }

}