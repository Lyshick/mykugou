import request from "./http";

export const recommend = {
    getRecom:function(r){
        return request({
            url:"?json=true",
            method: "get",
            data: r
        })
    },
    getClass:function(r){
        return request({
            url:"singer/class&json=true",
            method: "get",
            data: r
        })
    },
    getSinger:function(r){
        return request({
            url: 'singer/list/'+r+'?json=true',
            method: "get"
        })
    },
    getRank:function(r){
        return request({
            url: 'rank/list&json=true',
            method: "get"
        })
    },
    getRankList:function(r){
        return request({
            url:'rank/info/?page=1&json=true&rankid='+r
        })
    },
    getBannerList:function(r){
        return request({
            url:'plist/list/'+ r +'?json=true'
        })
    }
}

export const audioplay={
    getmusic:function(r){
        return request({
            url:'app/i/getSongInfo.php?cmd=playInfo&hash='+r,
            method: 'get'
        })
    }
}

