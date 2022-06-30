<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="classbox">

      <van-cell v-for="(item,index) in list" :key="index"
       :to="{path:'/singerList',query:{classid:item.classid}}">
          <img :src="item.imgurl" alt="">
          <p>{{item.classname}}</p>
      </van-cell>

    </van-list>
  </div>
</template>

<script>
import { recommend } from "../request/api";

export default {
  name:'classification',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      datas: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getData()])
        .then((res) => {
          this.datas = res[0].data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      return recommend.getClass();
    },
    onLoad() {
      // 异步更新数据
       setTimeout(() => {
        for (let i = 0; i < this.datas.length; i++) {
          this.list.push(this.datas[i]);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.classbox div{
    display: flex;
    height: 150px;
    line-height: 120px;
}
.classbox div p{
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
}
</style>