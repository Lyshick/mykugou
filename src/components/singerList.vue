<template>
  <div>
    <p>当前歌手分区为：{{ Classtitle.classname }}</p>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="singerbox">

        <van-cell v-for="(item, index) in list" :key="index" 
        :to="{path:'/singerDetail',query:{name:item.singername}}">
          <img :src="imgUrl[index]" alt="" />
          <p>{{ item.singername }}</p> 
        </van-cell>

      </van-list>
    </div>
  </div>
</template>

<script>
import { recommend } from "../request/api";

export default {
  name:'singerList',
  data() {
    return {
      Classtitle:"",
      datas: "",
      list: [],
      loading: false,
      finished: false,
      index: -1,
      imgUrl: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getdata()])
        .then((res) => {
          this.datas = res[0].data.singers.list.info;
          this.Classtitle = res[0].data

          for (var j = 0; j < this.datas.length; j++) {
            var str = this.datas[j].imgurl.replace("{size}/", "");
            this.imgUrl.push(str);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    getdata() {
      return recommend.getSinger(this.$route.query.classid);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.index++;
          this.list.push(this.datas[this.index]);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 50) {
          this.finished = true;
        }
      }, 1000);

    },

  },
};
</script>

<style scoped>

.singerbox div{
    padding: 0;
    height: 80px;
    display: flex;
    background-color: #EEEEEE;
    margin-bottom: 10px;
    border-radius: 10px;
}
.singerbox div img{
    height: 80px;
    width: 80px;
}
.singerbox div p{
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    width: 100%;
}
</style>

