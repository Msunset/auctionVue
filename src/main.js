// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import CountDown from 'vue2-countdown'
Vue.prototype.axios= axios;

axios.defaults.baseURL = 'http://localhost:8888';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.filter('dateFormat',value =>{
  return new Date(value).Format("yyyy-MM-dd hh:mm")
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App ,CountDown},
  template: '<App/>'
});
