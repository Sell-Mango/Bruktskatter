import {DetailedInfo, openCloseTime} from "@/features/shopDetails/viewModel/useShopDetails";
import {OpenTime} from "@/shared/types/OpenTime"

const openResponse = (closeTime:CloseTime)=>{
    const {closeHour,closeMinute} = closeTime;
    return {open: true, status: "Åpent", time: `- Stenger kl ${closeHour.toString().padStart(2, "0")}:${closeMinute.toString().padStart(2, "0")}`}
}

type CloseTime = {
    closeHour:number,
    closeMinute:number
}

const closedResponse:OpenTime = {open: false, status:"Stengt", time: "Klikk her for å se åpningstider"}

export const checkOpeningTime = (detailedInfo:DetailedInfo):OpenTime => {
    const {marketType} = detailedInfo
    const dateNow = new Date();
    if(marketType === "shop"){
        const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
        const today = dayNames[(dateNow.getDay() + 6) % 7] as keyof typeof detailedInfo.openingHours;
        const todayHours:openCloseTime|null = detailedInfo.openingHours ? detailedInfo.openingHours[today]:null
        if(!todayHours){
            return closedResponse
        }

        const currentTime = dateNow.getHours() * 60 + dateNow.getMinutes()
        const [openHour, openMinute] = todayHours.open.split(":").map(Number)
        const [closeHour, closeMinute] = todayHours.close.split(":").map(Number)
        const openTime = openHour * 60 + openMinute
        const closeTime = closeHour * 60 + closeMinute

        if (currentTime >= openTime && currentTime < closeTime) {
            return openResponse({closeHour, closeMinute})
        }
        return closedResponse
    }
    if(marketType === "marked"){
        let dateFrom = detailedInfo.dateFrom
        let dateTo = detailedInfo.dateTo
        if (dateFrom === null){
            dateFrom = dateNow
        }
        if (dateTo === null){
            dateTo = dateNow
        }
        if(dateFrom <= dateNow && dateTo >= dateNow){
            return {open: true, status: "Åpent", time: `- Åpent til ${dateTo.toLocaleDateString()}`}
        }
        if (dateFrom > dateNow){
            return {open: false, status: "Stengt", time: `- Åpner ${dateFrom.toLocaleDateString()}`}
        }
        return {open: false, status: "Stengt", time: "Markedet er desverre over"}
    }
    return {open: false, status: "", time: "Tid kommer"}
}