import Vue from "vue"
import vueRouter from "vue-router"

Vue.use(vueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

let importAll = require.context("@/components",true,/\.vue$/)
const routes = [{path:"/",redirect: "/Recommend"}]

importAll.keys().map(path=>{
    let list = importAll(path).default || importAll(path)
    var obj = {
        path:'/'+ list.name,
        component: importAll(path).default,
        name: list.name
    }
    routes.push(obj)
})

export default new vueRouter({
    mode:"history",
    routes
})