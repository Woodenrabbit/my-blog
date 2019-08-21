import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/page'
import pageNotFound from '@/components/pageNotFound';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/index/content'
    },
    {
      path: '/index',
      component: page,
      redirect: '/index/content',
      children:[
        {path: 'content', component: ()=>import("@/components/blogContent")},
        {path: 'blogs', component: ()=>import("@/components/blogArticle")},
      ]
    },
    {
      path:'*',
      component: pageNotFound
    }
  ]
})
