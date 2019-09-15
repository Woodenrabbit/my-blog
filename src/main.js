// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//使用中央总线（用于组件之间的通信）
import vueBus from 'vue-bus'
//使用markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/base.css'
import './assets/font/font_iconfont/iconfont.css'
//使用element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//解决NavigationDuplicated
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(mavonEditor);
Vue.use(vueBus);
Vue.use(elementUI);

//路由守卫
router.beforeEach((to, from, next) => {
	if (to.path.match('admin') && !to.path.match('login')) {
		if (localStorage.getItem('user') != 'admin') {
			next({
				path: '/admin/login'
			})
		}
	}
	next();
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
