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
      path: '/redirect',
      name: 'redirect',
      component: ()=>import("@/components/redirectPage")
    },    
    {
      path: '/admin',
      component: ()=>import("@/components/admin/manage"),
      redirect: 'admin/query',
      children:[
        {name:'adminCreate', path: 'create', component: ()=>import("@/components/admin/create")},
        {name:'adminUpdate', path: 'update', component: ()=>import("@/components/admin/update")},
        {name:'adminQuery', path: 'query', component: ()=>import("@/components/admin/query")},
      ]
    },
    {
      path: '/home',
      component: page,
      redirect: '/home/content',
      children:[
        {name:'content', path: 'content', component: ()=>import("@/components/blogContent")},
        {name:'blogs', path: 'blogs', component: ()=>import("@/components/blogArticle")},
        {name:'tags', path: 'tags', component: ()=>import("@/components/blogTags")},
        {name:'archive', path: 'archive', component: ()=>import("@/components/blogArchive")},
        {name:'about', path: 'about', component: ()=>import("@/components/blogAbout")},
      ]
    },
    {
      path:'*',
      component: pageNotFound
    }
  ]
})
