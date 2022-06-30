
// 设置cookie
function setcookie(keys,values,days){
    var dates = new Date()
    dates.setTime(dates.getTime()+(days*24*60*60*1000))
    dates.toUTCString()

    document.cookie = `${keys}=${values};expires=${dates}`
}

// 删除cookie
function removcook(key){
    setcookie(key,"",-1)
}

// 删除指定cookie
function del(some){
    removcook(some)
}

// 获取指定cookie的内容
function getcookie(key,value){
    var str = document.cookie.split(";")
    let datas = ""
    str.forEach(item=>{
        let lastdata = item.split("=")
        if(lastdata[0].trim()==key){
            datas = lastdata[1]
        }
        // if(lastdata[0].trim()==value){ //.trim()去除字符串首尾两端空格
        //     datas = lastdata[1]
        // }
    })
    return datas
}


export default {
    setcookie,
    removcook,
    del,
    getcookie
}