<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-10">
                <div class="jumbotron">
                    <hr>
                    <p v-if="error.length===0">Fill up the form to Log In</p>
                    <p v-else class="errorMessage" style="font-size: 16px">
                        <i class="fas fa-exclamation-triangle fa-lg"></i>
                        <span> {{ error }} </span>
                    </p>
                    <hr>
                </div>

                <form @submit.prevent="login">
                    <!-- Username -->
                    <template>
                        <div class="input-group form-group" :class="{ 'error-box': $v.info.username.$error }">
                            <label class="sr-only" for="formUsernamme">Username</label>
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <i class="fas fa-user fa-fw"></i> </div>
                            </div>

                            <input 
                                @blur="$v.info.username.$touch()"
                                v-model="info.username"
                                class="form-control"
                                id="formUsername"
                                placeholder="Username"
                                name="username" 
                                type="text"
                            >
                        </div>
                        <template v-if="$v.info.username.$error">
                            <p v-if="!$v.info.username.$required" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Username required </span>
                            </p>
                        </template>
                    </template>

                    <!-- Password -->
                    <template>
                        <div class="input-group form-group" id="pass" :class="{ 'error-box': $v.info.password.$error }">
                            <label class="sr-only" for="formPassword">Password</label>
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <i class="fas fa-lock fa-fw"></i> </div>
                            </div>
                            <input 
                                @blur="$v.info.password.$touch()"
                                v-model="info.password"
                                class="form-control" 
                                id="formPassword" 
                                placeholder="Password" 
                                name="password"
                                type="password"
                            >
                        </div>
                        <template v-if="$v.info.password.$error">
                            <p v-if="!$v.info.password.$required" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Password required </span>
                            </p>
                        </template>
                    </template>
                    
                    
                    <!-- Log in button -->
                    <template>
                        <button 
                            @click="$v.$touch()"
                            :disabled="$v.$anyError"
                            type="submit"
                            class="btn btn-primary
                            btn-lg btn-block"
                        > 
                            Log in
                        </button>
                    </template>
                
                    <!-- Sign up link -->
                    <div id="goRegister">
                        <p>
                            <span> Do not have an accout? </span>
                            <router-link :to="{ name: 'SignUp'}" > <a> Register Here </a> </router-link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import NProgress from 'nprogress'
    import { required } from 'vuelidate/lib/validators'

    export default {
        data(){
            return {
                info: {
                    username: '',
                    password: ''
                },
                error: ''
            }
        },
        validations: {
            info: {
                username: { required },
                password: { required }
            }

        },
        methods: {
            login(){
                NProgress.start();
                this.$store
                    .dispatch('authService/LogInUser', this.info)
                    .then((response)=> {
                        if(response.isAdmin){
                            this.$router.push({
                                name: 'AdminDashboard',
                            })
                        } else {
                            this.$router.push({
                                name: 'UserProfile',
                            })
                        }
                        
                    })
                    .catch(error => {
                        this.error = error;
                    })
                NProgress.done()
            }
        }
        
    }
</script>

<style lang="css" scoped>
    /* --------------------( body )-------------------- */
    body {
        margin: 1px auto 60px auto;
        font-family: ubuntu;
    }

    /* --------------------( ^ body )-------------------- */

    .jumbotron {
        margin-top: 2%;
        margin-bottom: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
        font-family: ubuntu;
    }

    form {
        margin: 15% auto;
    }

    #pass {
        margin-top: 6%;
    }

    form button {
        margin-top: 10%;
        font-family: 'amaranth';
    }

    #goRegister {
        text-align: right;
        margin-top: 5%;
        margin-right: 10px;
    }

    #goRegister a {
        font-family: 'amaranth';
    }

    .error-box {
        box-shadow: 5px 5px 10px red;
    }

    .errorMessage {
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