import { createWebHistory, createRouter } from 'vue-router'
import Signin from "../pages/Signin.vue"
import Signup from '../pages/Signup.vue';
import Home from '../pages/Home.vue';
const routes = [
    {
        path: "/signup",
        component: Signup,
    },
    {
        path: "/signin",
        component: Signin,
    },
    {
        path: "/home",
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
