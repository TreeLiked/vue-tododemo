import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;


// 全局使用jq
import $ from 'jquery';

// 使用vue-blu
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

Vue.use(VueBlu);

// 使用bulma
// import Bulma from 'bulma'
// import 'bulma/css/bulma.min.css'
// import 'bulma/bulma.sass'
// Vue.use(Bulma);

// 使用axios
let axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:8080/api';
// axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
// 将API方法绑定到全局
Vue.prototype.$axios = axios;

// 使用vue路由
import VueRouter from 'vue-router'
import Log from "@/components/Log"; // 引入vue-router
import Reg from "@/components/Reg";
import Main from "@/components/Main";

Vue.use(VueRouter); // 使用路由

// 配置路由页面
// 设置路由信息
const routes = [
    {path: '/login', component: Log, name: 'login'},
    {path: '/reg', component: Reg, name: 'reg'},
    // {path: '/', component: Main, redirect: {name: 'Login'}}
    {path: '/', component: Main, name: 'main'},
    // {path: '*', component: '<template><div>not found</div></template>'}
];
const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes,
    mode: 'history',
    hashbang: false,
    history: true,
});

new Vue({
    $,
    router,
    render: h => h(App),
}).$mount('#app');
