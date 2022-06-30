<template>
  <div>
    <div class="headBanner">
      <van-swipe :autoplay="3000"  class="myswiper">
        <van-swipe-item v-for="(item, index) in datas.banner" :key="index">
          <router-link 
          :to="{path:'/bannerList',query:{specialid:item.extra.specialid}}">
            <img v-lazy="item.imgurl" />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="song-sheet">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">

        <van-cell v-for="(item, index) in list" :key="index"
        :title="item.name" :to="{path:'/audioPlay',query:{hash:item.hash}}" />

      </van-list>
    </div>
  </div>

</template>

<script>
import { recommend } from "../request/api";
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);

export default {
  name:'Recommend',
  data() {
    return {
      datas: "",
      list: [],
      loading: false,
      finished: false,
      index: -1,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getrecome()])
        .then((res) => {
          this.datas = res[0].data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getrecome() {
      return recommend.getRecom();
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.index++;
          this.list.push(
            {
              name:this.datas.data[this.index].filename,
              hash:this.datas.data[this.index].hash
            }
          );
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 25) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  components: {},
};
</script>


<style scoped>
.headBanner {
  overflow: hidden;
  border-radius: 20px;
  margin-top: 20px;
}
.headBanner img {
  height: 100%;
  width: 100%;
}
.song-sheet{
    margin-top: 20px;
    overflow: hidden;
    text-align: left;
    padding-left: 10px;
    font-size: 18px;
}
</style>