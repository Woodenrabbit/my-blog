import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/blog/page'
import pageNotFound from '@/components/common/pageNotFound';

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/home/content'
		},
		{
			path: '/redirect',
			name: 'redirect',
			component: () => import("@/components/common/redirectPage")
		},
		{
			path: '/admin',
			component: () => import("@/components/admin/manage"),
			redirect: 'admin/query',
			children: [
				{ name: 'adminLogin', path: 'login', component: () => import("@/components/admin/login") },
				{ name: 'adminCreate', path: 'create', component: () => import("@/components/admin/create") },
				{ name: 'adminUpdate', path: 'update', component: () => import("@/components/admin/update") },
				{ name: 'adminQuery', path: 'query', component: () => import("@/components/admin/query") },
			]
		},
		{
			path: '/home',
			component: page,
			redirect: '/home/content',
			children: [
				{ name: 'content', path: 'content', component: () => import("@/components/blog/blogContent") },
				{ name: 'blogs', path: 'blogs', component: () => import("@/components/blog/blogArticle") },
				{ name: 'tags', path: 'tags', component: () => import("@/components/blog/blogTags") },
				{ name: 'archive', path: 'archive', component: () => import("@/components/blog/blogArchive") },
				{ name: 'about', path: 'about', component: () => import("@/components/blog/blogAbout") },
			]
		},
		{
			path: '*',
			component: pageNotFound
		}
	]
})
