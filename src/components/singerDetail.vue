<template>
  <div id="singerDetail">
    <div>
        <p class="singerName">歌手：{{singerName}}</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="songbox">

        <van-cell v-for="(item,index) in datas.info" :key="index"
        :to="{path:'/audioPlay',query:{hash:item.hash}}">
            <p>{{ item.songname }}</p>
            <p>歌手：{{ item.singername }}</p>
            <p>专辑：{{ item.album_name }}</p>
        </van-cell>

      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name:'singerDetail',
  data() {
    return {
      singerName:'',
      list: [],
      loading: false,
      finished: false,
      datas:''
    };
  },
  created() {
    this.$http
      .get(
        "/list/v3/search/song?format=json&page=1&pagesize=20&showtype=1&keyword=" +
          this.$route.query.name
      )
      .then((res) => {
        this.datas = res.data.data
        this.singerName = this.$route.query.name
      });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
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

<style scoped>
.singerName{
    font-size: 20px;
    font-weight: 800;
    text-align: left;
    padding: 0 20px;
}
.songbox div{
    margin-bottom: 10px;
}
.songbox div p:nth-child(1){
    font-weight: 600;
    font-size: 18px;
}
</style>