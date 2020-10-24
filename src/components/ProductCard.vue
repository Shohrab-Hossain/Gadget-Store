<template>
    <div>
        <div class="card card-sh">
            <img :src="product.about.url" class="card-img-top img-fluid img-thumbnail" :alt="product.about.name">
            <div class="card-body card-body-sh">
                <h5 class="card-title card-title-sh">{{ product.about.name }}</h5>
                <p class="card-text card-text-sh">{{ product.about.details }}</p>
                <p class="card-text card-text-sh2">{{ product.type }}</p>
                
                <div class="container">
                    <div class="row justify-content-center">
                        <button class="btn btn-success btn-price col-lg-8 col-10">
                            Price: <span>  ${{product.price}} </span>
                        </button>
                    </div>

                    <div class="row justify-content-center">
                        <template v-if="!productIDs.includes(product.id)">
                            <button @click="sendUpdateData(product)" class="btn btn-outline-info btn-addCart col-lg-8 col-10">
                                <i class="fas fa-cart-plus fa-lg"></i>
                                <span> Add to cart </span>
                            </button>
                        </template>
                        <template v-else class="btn-danger">
                            <button @click="sendUpdateData(product)" class="btn btn-outline-danger btn-addCart col-lg-8 col-10">
                                <i class="fas fa-cart-arrow-down fa-lg"></i>
                            <span> Remove item </span>
                            </button>
                        </template>
                    </div>

                    <div class="row justify-content-center" style=" margin-top: 30px;">
                        <template v-if="isAdminActive" >
                            <button @click="deleteProduct(product)" class="btn btn-danger">
                                <i class="fas fa-trash-alt fa-fw"></i>
                                <span> Delete </span>
                            </button>

                            <router-link :to="{name: 'ProductDetails', params: {product, page}}">
                                <a href="#" type="button" class="btn btn-primary" style="margin-left: 15px">
                                    <i class="fas fa-edit fa-fw"></i>
                                    <span> Edit </span>
                                </a>
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            page: Number
        },
        data(){
            return {
                productIDs: [],
                editProduct: {}
            }
        },
        methods: {
            sendUpdateData(item){
                item['quantity'] = 1;
                this.$store.dispatch('cart/updateCart', item);
                if(this.productIDs.includes(item.id)) this.productIDs.splice( this.productIDs.indexOf(item.id), 1);
                else this.productIDs.push(item.id);  
            },
            deleteProduct(item){
                this.$store.dispatch('products/deleteProduct', item);
            },
            getEditProduct(){
                this.editProduct = this.product;
            },
        },
        computed:{
            isAdminActive(){
                return this.isAdmin && this.userLoggedIn
            },
            ...mapState('cart', ['cart']),
            ...mapState('authService', ['isAdmin', 'userLoggedIn']),
        }
    }
</script>

<style lang="css" scoped>
    .card-sh{
        margin: 20px 20px 50px 20px;
        box-shadow: 5px 5px 11px 0px #a58888;
        color: rgb(3, 0, 29);
    }

    .card-sh:hover{
        cursor: pointer;
        height: 85%;
        width: 90%;
    }

    .card-body-sh{
        background-color: #d8fff2;
    }

    .card-title-sh{
        font-family: 'Fugaz One';
        text-shadow: 3px 3px 5px #9c8c8c;
    }

    .card-text-sh{
        font-family: Acme;
    }

    .card-text-sh2{
        margin-top: 5px;
        font-family: Amaranth;
        font-size: medium;;
        letter-spacing: 1px;
        color: rgb(69, 75, 69);
    }

    .btn-price{
        margin-top: 5px;
        font-family: 'Acme';
        letter-spacing: 1px;
        
        /* border-top-left-radius: 10px;
        border-bottom-left-radius: 10px; */
    }

    .btn-price span {
        margin-left: 5px;
        font-family: ubuntu;
        font-weight: bolder;
        font-size: large;
    }

    .btn-addCart{
        margin-top: 15px;
        font-family: 'Kite One';
        letter-spacing: 1px;
        font-weight: bolder;
    }

    .btn-addCart span{
        margin-left: 5px;
    }
</style>