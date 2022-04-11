import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Marketplace from '../views/MarketPlace.vue'
import EirbMon from '../views/EirbMon.vue'
import SigninView from "../views/SigninView.vue"
import SignupView from '../views/SignupView.vue'
import ProfileView from "../views/ProfileView"
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: Marketplace
  },
  {
    path: '/eirbmon/:id',
    name: 'marketplace-id',
    component: EirbMon
  },
  {
    path: '/eirbmon',
    name: 'eirbmon',
    component: EirbMon
  },
  {
    path: "/signup",
    component: SignupView,
  },
  {
    path: "/signin",
    component: SigninView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView
  },
  {
    name:'NotFound',
    path:'/:pathMatch(.*)*',
    component:PageNotFound,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router