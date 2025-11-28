export function formatOpeningDates(dateFrom: Date|null, dateTo: Date|null) {
    if (!dateFrom) {
        dateFrom = new Date();
    }
    let toDate = ""
    let toTime = ""
    if (dateTo) {
        toDate = dateTo.toLocaleDateString()
        toTime = `${dateTo.getHours().toString().padStart(2, "0")}:${dateTo.getMinutes().toString().padStart(2, "0")}`
    }
    const fromDate = dateFrom.toLocaleDateString()
    const fromTime = `${dateFrom.getHours().toString().padStart(2,"0")}:${dateFrom.getMinutes().toString().padStart(2, "0")}`
    return `Åpner: ${fromDate} - ${fromTime}${dateTo ? `, Stenger: ${toDate} - ${toTime}`: ""}`
}