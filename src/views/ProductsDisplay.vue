<template>
    <div>
        <h1>Events for shop</h1>
        <div class="container">
            <div class="row justify-content-center">
                <ProductCard
                    class="col-lg-4 col-md-6 col-8"
                    v-for="product in products.products"
                    :key="product.id" 
                    :product="product"
                    :page="page"
                />
            </div>
        
            <div class="row">
                <nav aria-label="Page navigation example" class="col-12">
                <ul class="pagination pagination-sh justify-content-center">
                    <li class="page-item" :class="{ 'disabled': page === 1 }">
                        <router-link :to="{ name: 'ProductsDisplay', query: { page: 1 } }" class="page-link">
                            First Page
                        </router-link>
                    </li>
                    <li class="page-item" v-for="pageIndex in products.pagination" :key="pageIndex">
                        <router-link :to="{ name: 'ProductsDisplay', query: { page: pageIndex} }" class="page-link">
                            {{ pageIndex }}
                        </router-link>
                    </li>
                    <li class="page-item" :class="{ 'disabled': page === lastPage }">
                        <router-link :to="{ name: 'ProductsDisplay', query: { page: lastPage } }" class="page-link" rel="next">
                            Last Page
                        </router-link>
                    </li>
                </ul>
            </nav>
            </div>

        </div>
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue'
    import { mapState } from 'vuex'
    import store from '@/store'

    function getSomeProducts(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1
        store.dispatch('products/fetchProducts', { page: currentPage })
            .then(() => {
                routeTo.params.page = currentPage
                next()
            })
    }

    export default {
        beforeRouteEnter(routeTo, routeFrom, next) {
            getSomeProducts(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            getSomeProducts(routeTo, next)
        },
        props: {
            page: {
                type: Number,
                required: true
            }
        },
        components: {
            ProductCard
        },
        computed: {
            lastPage(){
                return Math.ceil(this.products.productsTotal / this.products.perPage);
            },
            ...mapState(['products'])
        }
    }
</script>

<style lang="css" scoped>
    .pagination-sh{
        margin: 30px auto;
    }
</style>