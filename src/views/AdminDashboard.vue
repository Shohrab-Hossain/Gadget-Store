<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1>Admin Dashboard</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-4 col-6">
                <p>Best Profit product</p>
                <ProductCard
                    :product="bestProfitProduct"
                    :page="page"
                />
            </div>
       
            <div class="col-lg-4 col-6">
                <p>Best sell product</p>
                <ProductCard
                    :product="bestSellProduct"
                    :page="page"
                />
            </div>
        </div>
        
        
    </div>
</template>

<script>
    import ProductCard from '@/components/ProductCard.vue'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                page: 1,
                bestProfitProduct: {
                    "id": "6f0f677e38fb7",
                    "type": "Ram",
                    "about": {
                    "name": "Kingston HyperX Predator",
                    "details": "Best DDR3 RAM",
                    "url": "https://cdn.mos.cms.futurecdn.net/Gjnwh5NDUiqkL6RM6EXt2R-970-80.jpg.webp"
                    },
                    "price": "1",
                    "profitMargin": 23
                },
                bestSellProduct: {
                    "id": "fec6633b2a457",
                    "type": "Motherboard",
                    "about": {
                    "name": "GIGABYTE Z490 Gaming X",
                    "details": "Best budget Intel motherboard",
                    "url": "https://cdn.mos.cms.futurecdn.net/LA8uDEnevevMrABwcXPfqD-970-80.jpg.webp"
                    },
                    "price": 144,
                    "profitMargin": "21000"
                },
            }
        },
        computed: {
            ...mapState(['authService'])
        },
        components: {
            ProductCard
        }
    }
</script>

<style lang="css" scoped>

</style>