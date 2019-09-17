import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import router from './router'
import Router from 'vue-router'
import echarts from 'vue-echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)
//vue-router在3.0以后的版本已经改成promise api形式
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
