<template>
  <div>
    <div class="headbanner">
      <p>用户登录</p>
    </div>
    <div class="fromBox">
      <van-cell-group border>
          <p v-show="flag" v-text="info"></p>
        <van-cell><van-field v-model="text" label="用户名" /></van-cell>
        <van-cell><van-field v-model="password" type="password" label="密码" /></van-cell>
        <van-cell class="btnbox">
            <van-button plain type="warning" @click="regist">注册</van-button>
            <van-button plain type="info" @click="login">登录</van-button>
        </van-cell>
      </van-cell-group>   
    </div>
  </div>
</template>

<script>
import userData from "../server/userData.json"
import { Dialog } from 'vant';
import cookie from "../server/cookie"

export default {
  name:'UserLogin',
  data() {
    return {
      text: "",
      password: "",
      flag: false,
      info:''
    };
  },
  methods: {
      regist(){
        let arr = ["a","b","c","d","e"]
        var newarr= []
        if(this.text&&this.password){
          for(var i=0;i<arr.length;i++){
            var sum = Math.floor(Math.random()*arr.length)
            newarr.push(arr[sum])
            var str = newarr.join("")
          }
          userData.userData.push(
            {
              "user":this.text,
              "psw":this.password,
              "isactive": str,
              "Introduction":"该用户很懒还没有简介",
              "attention": 10,
              "Fans": 0,
              "Buddy" : 10,
              "Visitor": 52,
              "songsData":
              {
                "like":[],
                "star":[]
              }
            })
            this.flag = true
            this.info = "注册成功"
        }else{
          this.flag = true
          this.info = "用户名和密码不能为空"
        }   
      },
      login(){
          var user = userData.userData
          for(var i=0;i<user.length;i++){
              if(this.text==user[i].user&&this.password==user[i].psw){
                  this.flag = false
                  cookie.setcookie("isactive",user[i].isactive,1)
                  Dialog.alert({
                    title: '登录成功',
                    message: '欢迎回来'+this.text,
                    confirmButtonColor:"cadetblue"
                  }).then(()=>{
                    this.$router.push({path:"/userDetail"})
                  })  
              }else{
                  this.flag = true
                  this.info = "用户名或密码错误"
              }
          }
      }
  },
};
</script>

<style scoped>
.headbanner {
  height: 175px;
  width: 100%;
  margin-top: 20px;
  background: url("https://pic.imgdb.cn/item/60d3fe57844ef46bb21b3202.jpg") no-repeat;
  background-size: 100%;
}
.headbanner p {
  line-height: 175px;
  font-size: 20px;
  color: #666;
  font-weight: 600;
  letter-spacing: 10px;
}
.btnbox button{
    float: right;
    margin-right: 10px;
    width: 100px;
}
</style>