import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gBel',
      meta:{title:'Bel Siap'},
      component: () => import('./views/guest/Bel.vue')
    },
    {
      path: '/masuk',
      name: 'gLogin',
      meta:{title:'Masuk ke Aplikasi'},
      component: () => import('./views/guest/Login.vue')
    },
    {
      path: '/panel',
      component: () => import('./views/layouts/User.vue'),
      children: [
        {
          path: '',
          name: 'uDashboard',
          meta:{title:'Selamat Datang!'},
          component: () => import('./views/user/Dashboard.vue')
        },
        {
          path: 'audio',
          name: 'uAudio',
          meta:{title:'Manajemen Audio'},
          component: () => import('./views/user/Audio.vue')
        },
        {
          path: 'waktu',
          name: 'uTime',
          meta:{title:'Manajemen Waktu Bel & Informasi'},
          component: () => import('./views/user/Time.vue')
        },
        {
          path: 'akun',
          name: 'uAccount',
          meta:{title:'Pengaturan Akun'},
          component: () => import('./views/user/Account.vue')
        },
        {
          path: 'label',
          name: 'uLabel',
          meta:{title:'Label Audio'},
          component: () => import('./views/user/Label.vue')
        },
        {
          path: 'label/:id',
          name: 'uDetailLabel',
          meta:{title:'Detail Label'},
          component: () => import('./views/user/DetailLabel.vue')
        },
        {
          path: '/tentang',
          name: 'uAbout',
          meta:{title:'Tentang Aplikasi'},
          component: () => import('./views/user/About.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title // Set <title> for every components
  NProgress.start()
  NProgress.set(0.5)
  next()
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 20)
})

export default router
