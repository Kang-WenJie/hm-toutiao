import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'
import Login from '@/views/login'
import Home from '@/views/home'
import Wel from '@/views/welcome/welcome.vue'
import Notfound from '@/views/notfound/not404.vue'
import Article from '@/views/article/article'
import Image from '@/views/image/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      // redirect: '/wel',
      children: [
        { path: '/wel', component: Wel },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans },
        { path: '/setting', component: Setting }
      ]
    },
    { path: '*', component: Notfound }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
