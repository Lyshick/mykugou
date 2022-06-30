<template>
  <div>
    <van-sticky>
      
    <van-nav-bar
      title="Ly音乐"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #right>
          <van-icon name="manager" size="20" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" color="cadetblue" line-width="60px">
      <van-tab title="音乐推荐" to="/recommend"> </van-tab>
      <van-tab title="歌手分类" to="/classification"></van-tab>
      <van-tab title="音乐排行" to="/ranking"></van-tab>
    </van-tabs>

    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"/>

    </van-sticky>
  </div>
</template>

<script>
import user from "../server/userData"
import cookie from "../server/cookie"

export default {
  name:'NavHead',
  data() {
    return {
      active: 0,
      value: "",
    };
  },
  methods: {
    onSearch(val) {
      this.$router.push({ path: "/searchDetail", query: { val: val } });
      this.value = ""
    },
    onCancel() {
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight(){
      user.userData.forEach((item,index)=>{
        if(item.isactive==cookie.getcookie("isactive")&&cookie.getcookie("isactive")){
          this.$router.push({path:"/userDetail"})
        }else{
          this.$router.push({path:"/userLogin"})
        }
      })
    }
  }
};
</script>

<style scoped>
</style>
