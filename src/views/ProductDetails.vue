<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-10">
                <img :src="product.about.url" class="card-img-top img-fluid img-thumbnail" :alt="product.about.name">
                
                <form @submit.prevent="update">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Name </div>
                        </div>
                        <input
                            @blur="$v.product.about.name.$touch()"
                            v-model="product.about.name"
                            class="form-control" 
                            name="password"
                        >
                    </div>

                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Details </div>
                        </div>
                        <input 
                            @blur="$v.product.about.details.$touch()"
                            v-model="product.about.details"
                            class="form-control" 
                            name="password"
                        >
                    </div>

                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Type </div>
                        </div>
                        <input 
                            @blur="$v.product.type.$touch()"
                            v-model="product.type"
                            class="form-control" 
                            name="password"
                        >
                    </div>

                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Price </div>
                        </div>
                        <input 
                            @blur="$v.product.price.$touch()"
                            v-model="product.price"
                            class="form-control" 
                            name="password"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                $
                            </div>
                        </div>
                    </div>

                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Margin </div>
                        </div>
                        <input 
                            @blur="$v.product.profitMargin.$touch()"
                            v-model="product.profitMargin"
                            class="form-control" 
                            name="password"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                %
                            </div>
                        </div>
                    </div>

                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text"> Url </div>
                        </div>
                        <input 
                            @blur="$v.product.about.url.$touch()"
                            v-model="product.about.url"
                            class="form-control" 
                            name="password"
                        >
                    </div>

                    <!-- Update button -->
                    <template>
                        <button 
                            @click="$v.$touch()"
                            :disabled="$v.$anyError"
                            type="submit"
                            class="btn btn-primary
                            btn-lg btn-block"
                            style="margin-top: 40px"
                        > 
                            Update
                        </button>
                    </template>
                    <template v-if="$v.$anyError">
                        <p class="errorMessage">
                            <i class="fas fa-exclamation-triangle fa-lg"></i>
                            <span> Please, fill out the required fiels(s). </span>
                        </p>
                    </template>
                    <template v-if="error.length!==0">
                        <p class="errorMessage">
                            <i class="fas fa-exclamation-triangle fa-lg"></i>
                            <span> {{ error }} </span>
                        </p>
                    </template>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script>
    import NProgress from 'nprogress'
    import { required } from 'vuelidate/lib/validators'
    export default {
        props: {
            product: {},
            page: Number
        },
        data(){
            return {
                error: ''
            }
        },
        methods: {
            update(){
                NProgress.start();
                this.$store
                    .dispatch('products/updateProduct', this.product)
                    .then(()=> {
                        this.$router.push({
                            name: 'ProductsDisplay',
                            query: {page: this.page}
                        })
                    })
                    .catch(error => {
                        this.error = error;
                    })
                NProgress.done()
            }
        },
        validations: {
            product: {
                type: { required },
                about: {
                    name: { required },
                    details: { required },
                    url: { required }
                },
                price: { required },
                profitMargin: { required } 
            }
        }
    }
</script>

<style lang="css" scoped>
    form {
        margin: 30px auto;
    }

    .error-box {
        box-shadow: 5px 5px 10px red;
    }

    .errorMessage {
        margin-top: 15px;
        margin-left: 20px;
        font-family: 'Kite One';
        font-size: 14px;
    }

    .errorMessage i {
        color: red;
    }

    .errorMessage span {
        margin-left: 5px;
        color: red;
        letter-spacing: 1px;
        font-weight: bolder;
        text-shadow: 5px 5px 8px #676565;
    }
</style>