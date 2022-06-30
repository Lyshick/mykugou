<template>
  <div>
    <div class="palybox">
      <audio :src="audioSrc" controls :style="style"></audio>
    </div>
    <van-button type="danger" @click="addlike" icon="like" :text="like"></van-button>
    <van-button type="warning" @click="addstar" icon="star" :text="star"></van-button>
  </div>
</template>

<script>
import user from "../server/userData"
import cookie from "../server/cookie"

import { audioplay } from "../request/api";
export default {
  name:'audioPlay',
  data() {
    return {
      audioSrc: "",
      imgurl:'',
      datas:'',
      like:'喜欢',
      star:'收藏',
      style: {
        height: "420px",
        width: "100%",
        borderRadius: "30px",
        backgroundImage: "",
        backgroundSize: "100%",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getData()])
        .then((res) => {
          var str = res[0].data.album_img.replace("{size}/", "")
          this.imgurl = `url(${str})`
          this.style.backgroundImage = this.imgurl
          this.audioSrc = res[0].data.backup_url[0];
          this.datas = res[0].data

          user.userData.forEach(item=>{
            if(item.isactive==cookie.getcookie("isactive")&&cookie.getcookie("isactive")){
              item.songsData.like.forEach(songs=>{
                if(songs.hash==this.datas.hash){
                  this.like = "已喜欢"
                }
              })
              item.songsData.star.forEach(songs=>{
                if(songs.hash==this.datas.hash){
                  this.star = "已收藏"
                }
              })
            }
          })
        }).catch((err) => {
          console.log(err);
        });
    },
    getData() {
      return audioplay.getmusic(this.$route.query.hash);
    },
    addlike(){
      user.userData.forEach((item,index)=>{
        if(item.isactive==cookie.getcookie("isactive")&&cookie.getcookie("isactive")){
          this.like = "已喜欢"
          item.songsData.like.push(
            {
              filename: this.datas.fileName,
              hash:this.datas.hash
            })
            // item.songsData.like.splice(index,1)
            // this.like = "喜欢"
          }
      })
    },
    addstar(){
      user.userData.forEach(item=>{
        if(item.isactive==cookie.getcookie("isactive")&&cookie.getcookie("isactive")){
          this.star = "已收藏"
          item.songsData.star.push(
            {
              filename: this.datas.fileName,
              hash:this.datas.hash
            }
          )}
      })
    }
  },
};
</script>

<style scoped>
.palybox{
    overflow: hidden;
    margin-top: 20px;
    padding: 5px;   
}
button{
  margin: 0 10px;
  height: 45px;
  line-height: 45px;
  letter-spacing: 2px;
}
</style>