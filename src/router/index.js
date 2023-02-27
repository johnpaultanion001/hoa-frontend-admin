import Vue from 'vue'
import VueRouter from 'vue-router'
import AppRouter from './app.router';
import AuthRouter from './auth.router';
import {authorized, guest} from "@/globals/guard";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        beforeEnter: authorized,
        component: () => import('../resources/layout/master.component'),
        children: AppRouter,
    },
    {
        path: '/auth',
        beforeEnter: guest,
        component: () => import('../resources/layout/auth.component.vue'),
        children: AuthRouter,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})


export default router
