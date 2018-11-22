import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ '@/views/Signin'),
    },
  ],
})

router.afterEach((to/*, from*/) => {
  // 스택으로 올린 것들은 중복방지
  if (!to.query.isStack) {
    if (window.gtm) {
      window.gtm.push({ event: 'typingPracticeRoute', pageType: 'PageView', pageUrl: to.fullPath })
    }
  }
})

export default router
