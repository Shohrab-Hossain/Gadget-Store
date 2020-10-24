import EventService from '@/services/EventService.js'
import router from "@/router";

export const namespaced = true

export const state = {
    products: [],
    product: {},
    pagination: [],
    paginationLength: 5,
    productsTotal: 0,
    perPage: 10
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    ADD_PRODUCT(state, product) {
        state.products.push(product);
    },
    DELETE_PRODUCT(state, product) {
        state.products.splice( state.products.indexOf(product), 1);
    },
    UPDATE_PRODUCT(state, product) {
        state.products[state.products.indexOf(product)] = product;
    },
    SET_PRODUCT(state, product) {
        state.product = product;
    },
    SET_PRODUCTS_TOTAL(state, productsTotal) {
        state.productsTotal = productsTotal;
    },
    SET_PAGINATION(state, pagination){
        state.pagination.push(pagination);
    },
    CLEAR_PAGINATION(state){
        state.pagination = []
    }
}

export const actions = {
    createProduct({ commit }, product) {
        return EventService.postProduct(product)
            .then(() => {
                commit('ADD_EVENT', product);
                commit('SET_PRODUCT', product)
            })
            .catch(error => {
                errorSolver(error);
            })
    },
    deleteProduct({ commit }, product) {
        return EventService.deleteProduct(product)
            .then((response) => {
                commit('DELETE_PRODUCT', product);
                return response;
            })
            .catch(error => {
                console.log(error)
            })
    },
    updateProduct({ commit }, product) {
        return EventService.updateProduct(product)
            .then(() => {
                commit('UPDATE_PRODUCT', product);
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchProducts({ commit/* , dispatch */, state }, { page }) {
        return EventService.getProducts(page, state.perPage)
            .then(response => {
                commit('SET_PRODUCTS_TOTAL', parseInt(response.headers['x-total-count']));
                commit('SET_PRODUCTS', response.data);
                getPaginationValue(commit, page)
            })
            .catch(error => {
                errorSolver(error);
            })
    },
    fetchProduct({ commit, getters, state }, id) {
        if (id == state.product.id) {
            return state.product
        }

        var product = getters.getProductById(id)

        if (product) {
            commit('SET_EVENT', product)
            return product
        } else {
            return EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data);
                    return response.data
                })
                .catch(error => {
                    errorSolver(error);
                })
        }
    }
}

export const getters = {
    getProductById: state => id => {
        return state.products.find(product => product.id === id)
    }
}

function getPaginationValue(commit, page){
    commit('CLEAR_PAGINATION');
    let window = state.paginationLength
    let halfWindow = Math.floor( (window%2===0 ? window+1 : window) /2);
    let totalPage = Math.ceil(state.productsTotal/state.perPage);
    let startingPage, endingPage;
    if(page < halfWindow){
        startingPage = 2;
        endingPage = startingPage + window - 1;
    }
    else if( (page+window) > totalPage ){
        endingPage = totalPage-1;
        startingPage = endingPage - window + 1;
    }
    else {
        startingPage = page - halfWindow;
        endingPage = page + halfWindow;
    }
    for (let index = startingPage; index <= endingPage; index++){
        commit('SET_PAGINATION', index);
    }
}

function errorSolver(error){
    if (error.response && error.response.status == 404) {
        router.push({ name: '404' })
    } else {
        router.push({ name: 'network-issue' })
    }
}