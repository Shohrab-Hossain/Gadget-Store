import Vue from "vue";
import Vuex from "vuex";
import * as products from '@/store/modules/products.js'
import * as authService from '@/store/modules/AuthService.js'
import * as cart from '@/store/modules/cart.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        products,
        authService,
        cart
    }
});
