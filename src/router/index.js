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
        {name:'tags', path: 'tags/:tag_name', component: ()=>import("@/components/blogTags")},
        {name:'archive', path: 'archive', component: ()=>import("@/components/blogArchive")},
      ]
    },
    {
      path:'*',
      component: pageNotFound
    }
  ]
})
