<template>
  <div>
    <div class="headCard">
      <div class="left">
        <img :src="bannerimg" alt="" />
      </div>
      <div class="right">
        <p>名称：{{ info.specialname }}</p>
        <p>创建人：{{ info.nickname }}</p>
        <p class="activeP">简介：{{ info.intro }}</p>
      </div>
    </div>

    <div class="songBox">
        <p>{{info.specialname}}--歌曲列表</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell v-for="(item,index) in songs" :key="index" 
        :to="{path:'/audioPlay',query:{hash:item.hash}}">
            {{ item.filename }}
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { recommend } from "../request/api";
export default {
  name:'BannerList',
  data() {
    return {
      info: "",
      songs: "",
      bannerimg: "",
      list: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getdata()]).then((res) => {
        console.log(res)
        this.info = res[0].data.info.list;
        this.bannerimg = res[0].data.info.list.imgurl.replace("/{size}", "");
        this.songs = res[0].data.list.list.info;
      });
    },
    getdata() {
      return recommend.getBannerList(this.$route.query.specialid);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.headCard {
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 5px #eee;
  display: flex;
}
.headCard p {
  overflow: hidden;
  color: #555;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.headCard img {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  margin-top: 5px;
}
.headCard .left {
  width: 150px;
}
.headCard .right {
  width: 100%;
  margin-left: 15px;
  text-align: left;
}
.songBox{
    margin-top: 30px;
}
.songBox p{
    font-size: 18px;
    font-weight: 600;
}
</style>