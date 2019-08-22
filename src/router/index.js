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
      name: 'home',
      redirect: '/home/content'
    },
    {
      path: '/home',
      component: page,
      redirect: '/home/content',
      children:[
        {path: 'content', component: ()=>import("@/components/blogContent")},
        {name:'blogs', path: 'blogs', component: ()=>import("@/components/blogArticle")},
      ]
    },
    {
      path:'*',
      component: pageNotFound
    }
  ]
})
