import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
//import MonitoringPage from "./components/MonitoringPage.vue";

const MonitoringPage = () => import("./components/MonitoringPage.vue");
const ConfigPage = () => import("./components/ConfigPage.vue");
const ProfilePage = () => import("./components/Profile.vue");
const Register = () => import("./components/Register.vue");

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/home",
        component: Home
    },
    
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/monitoring",
        name: "monitoring",
        component: MonitoringPage
    },
    {
        path: "/config",
        name: "config",
        component: ConfigPage
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;