<template>
  <div id="app">
    <NavHead />
    <router-view v-if="flag"></router-view>
  </div>
</template>

<script>
import NavHead from "./components/NavHead.vue";

export default {
  name: "App",
  data() {
    return {
      flag:true
    };
  },
  components: {
    NavHead,
  },
  watch:{
 "$route":function(to,from){
    if(to.path==from.path&&to.path!="/userDetail"&&from.path!="/userDetail"){
      location.reload()
    }
 }
}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
