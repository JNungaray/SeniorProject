import Vue from 'vue'
import VueRouter from 'vue-router'
import UserService from '@/services/UserService'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: { title: 'Login' },
        component: require("@/views/Login").default
    },
    
    {
        path: '/register',
        name: 'Register',
        meta: { title: 'Register' },
        component: require("@/views/Register").default
    },
    {
        path: '/faq',
        name: 'FAQ',
        meta: { title: 'FAQ' },
        component: require("@/views/FAQ").default
    },
    {
        path: '/',
        name: 'Home',
        meta: { title: localStorage.getItem('username') ? localStorage.getItem('username') : '' },
        component: require("@/views/Home").default
    },
    {
        path: '/chat/:id',
        props: true,
        name: 'Chat',
        meta: { title: 'Chat' },
        component: require("@/views/Chat").default
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/faq']
    const authrequired = !publicPages.includes(to.path)
    // include authentication here

    if (authrequired && !UserService.verifyUser()) {
        console.log('route needs authentication')
        return next('/login')
    }

    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))
    if (!nearestWithMeta) return next()
    
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta')
        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key])
        })    
        tag.setAttribute('data-vue-router-controlled', '')
        return tag
      }).forEach(tag => document.head.appendChild(tag))
    
    next()
})

router.name = 'router'

export default router
