<template>
  <div>
    <div>
      <p>{{ datas.rankname }}</p>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="rank-box">

      <van-cell
        v-for="(item, index) in songs.list"
        :key="index"
        :to="{ path: '/audioPlay', query: { hash: item.hash }}">
        <p>{{ item.filename }}</p>
      </van-cell>
      
    </van-list>
  </div>
</template>

<script>
import { recommend } from "../request/api";
export default {
  name:'RankList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      datas: "",
      songs: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getdata()]).then((res) => {
        this.datas = res[0].data.info;
        this.songs = res[0].data.songs;
      });
    },
    getdata() {
      return recommend.getRankList(this.$route.query.rankid);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>