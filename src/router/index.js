import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

import ProductsDisplay from "../views/ProductsDisplay.vue";
import ProductDetails from "../views/ProductDetails.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import UserProfile from "../views/UserProfile.vue";
import error404 from "../views/404.vue";
import NetworkIssue from "../views/NetworkIssue.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: { name: 'ProductsDisplay' }
    },
    {
        path: "/view-products",
        name: "ProductsDisplay",
        component: ProductsDisplay,
        props: true
    },
    {
        path: "/product-details",
        name: "ProductDetails",
        component: ProductDetails,
        props: true
    },
    {
        path: "/log-in",
        name: "LogIn",
        component: LogIn,
        props: true
    },
    {
        path: "/sign-up",
        name: "SignUp",
        component: SignUp,
        props: true
    },
    {
        path: "/admin-dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            if(store.state.authService.userLoggedIn){
                store.state.authService.isAdmin ?  next() : next({ name: '404' });
            } else {
                next({ name: 'LogIn' })
            }
        }
    },
    {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store.state.authService.userLoggedIn ?  next() : next({ name: 'LogIn' });
        }
    },
    {
        path: '/404',
        name: '404',
        component: error404,
        props: true
    },
    {
        path: '/network-issue',
        name: 'network-issue',
        component: NetworkIssue
    },
    {
        path: '*',
        redirect: { name: '404' }
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
