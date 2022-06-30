<template>
  <div>
    <div class="userbox" :style="style">
        <div class="userimg">头像</div>
        <div class="userinfo">
            <p class="userset">
              {{ userinfo.user }} 
              <van-button round type="info" @click="outuser" plain icon="replay" text="退出登录" size="small">
              </van-button>
            </p>
            <p>{{ userinfo.Introduction }}</p>
        </div>
        <div class="tagbox">
          <span>{{userinfo.attention}}关注</span>
          <span>{{userinfo.Fans}}粉丝</span>
          <span>{{ userinfo.Buddy }}好友</span>
          <span>{{userinfo.Visitor}}访客</span>
        </div>
    </div>
    <div class="infobox">
      <p>我的乐库</p>
      <div>
        <van-cell icon="like" title="喜欢" :value='userinfo.songsData.like.length' @click="showLike" is-link  :border="false" />
        <van-cell icon="star" title="收藏" :value='userinfo.songsData.star.length' @click="showStar" is-link  :border="false" />

        <van-popup v-model="likeshow" position="right" :style="{height:'100%'}">
          <van-cell-group title="我的喜欢">
            <van-cell v-for="(item,index) in userinfo.songsData.like" :key="index"
            :to="{path:'/audioPlay',query:{hash:item.hash}}">
              {{ item.filename }}
            </van-cell>
          </van-cell-group>
        </van-popup>

        <van-popup v-model="starshow" position="right" :style="{height:'100%'}">
          <van-cell-group title="我的收藏">
            <van-cell v-for="(item,index) in userinfo.songsData.star" :key="index"
            :to="{path:'/audioPlay',query:{hash:item.hash}}">
              {{ item.filename }}
            </van-cell>
          </van-cell-group>
        </van-popup>
        
      </div>
    </div>
  </div>
</template>

<script>
import user from "../server/userData";
import cookie from "../server/cookie"

export default {
  name:'userDetail',
  data() {
    return {
      userinfo: "",
      likeshow: false,
      starshow: false,
      style:{
        height: "250px",
        width: "100%",
        borderRadius: "0 0 30px 30px",
        backgroundImage: "",
        backgroundSize: "100%",
      }
    };
  },
  created() {
    this.getuser();
  },
  methods: {
    getuser() {
      user.userData.forEach(item => {
        if (item.isactive==cookie.getcookie("isactive")) {
          this.userinfo = item;
        }
      });
      var imgurl = "https://pic.imgdb.cn/item/60d3d374844ef46bb23c2a9b.jpg"
      var str = `url(${imgurl})`
      this.style.backgroundImage = str
    },
    showLike(){
      this.likeshow = true
    },
    showStar(){
      this.starshow = true
    },
    outuser(){
      cookie.del("isactive")
      location.reload()
    }
  },
};
</script>


<style scoped>
.userbox {
  padding: 0 10px;
  padding-top: 20px;
  box-sizing: border-box;
}
.userimg {
  background-color: #eee;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.userinfo {
  width: 100%;
}
.userinfo p {
  text-align: left;
  margin: 0;
  margin-top: 10px;
  margin-left: 25px;
  color: #eee;
}
.userinfo p:nth-child(1) {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 5px;
}
.userinfo p:nth-child(2){
  font-size: 16px;
}
.userset{
  display: flex;
  justify-content: space-between;
}
.tagbox{
  width: 100%;
  margin-top: 10px;
  color: #eee;
}
.tagbox span{
  display: inline-block;
  margin: 0 20px;
}

.infobox{
  overflow: hidden;
}
.infobox p{
  text-align: left;
  padding-left: 20px;
}
</style>