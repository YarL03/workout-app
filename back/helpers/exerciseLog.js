export const transformTimes = (log, prevExLog = null) => {
    return log.times.map((item, index) => { 
        return { //небольшой объем данных, так что нестрашно
        ...item,
        prevWeight: prevExLog ? prevExLog.times[index].weight : 0,
        prevRepeat: prevExLog ? prevExLog.times[index].repeat : 0
    }})
}