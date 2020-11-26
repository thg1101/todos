import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// tell the global Vue instance to use the VueRouter plugin
Vue.use(VueRouter)

// our routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // catch-all route that redirects curious users back to the home page
    path: '/*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  mode: 'history', // use VueRouter history mode for nicer URLs
  routes
})

export default router
