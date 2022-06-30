<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="rank-box">
      <van-cell v-for="(item,index) in datas.list" :key="index"
      :to="{path:'/rankList',query:{rankid:item.rankid}}">
          <img :src="imgUrl[index]" alt="">
          <p>{{ item.rankname }}</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { recommend } from "../request/api";

export default {
  name:'Ranking',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      datas:'',
      imgUrl:[]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getdata()]).then((res) => {
        this.datas = res[0].data.rank
        for(var i=0;i<this.datas.list.length;i++){
          var str = this.datas.list[i].banner7url.replace("{size}/","")
          this.imgUrl.push(str)
        }
      });
    },
    getdata() {
      return recommend.getRank();
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


<style scoped>
.rank-box div{
  display: flex;
}
.rank-box div img{
  width: 150px;
  height: 150px;
}
.rank-box div p{
  line-height: 115px;
  padding-left: 40px;
  font-size: 20px;
  font-weight: 600;
}
</style>