import { createWebHistory, createRouter } from 'vue-router'
import SigninView from "../pages/SigninView.vue"
import SignupView from '../pages/SignupView.vue';
import HomeView from '../pages/HomeView.vue';
const routes = [
    {
        path: "/signup",
        component: SignupView,
    },
    {
        path: "/signin",
        component: SigninView,
    },
    {
        path: "/home",
        component: HomeView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
