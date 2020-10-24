<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-10">
                <div class="jumbotron">
                    <hr>
                    <p>Fill up the form to Sign Up</p>
                    <hr>
                </div>

                <form @submit.prevent="signup">
                    <!-- Username -->
                    <template>
                        <div class="input-group form-group">
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

                            <template v-if="!$v.info.username.$invalid">
                                <div class="input-group-append">
                                    <div class="input-group-text" style="color: green">
                                        <i class="fas fa-check-circle fa-fw"></i>
                                    </div>
                                </div>
                            </template>
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
                        <div class="input-group form-group" id="pass">
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

                            <template v-if="!$v.info.password.$invalid && isPasswordOkay">
                                <div class="input-group-append">
                                    <div class="input-group-text" style="color: green">
                                        <i class="fas fa-check-circle fa-fw"></i>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <template v-if="$v.info.password.$error">
                            <p v-if="!$v.info.password.$required" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Password required </span>
                            </p>
                        </template>
                        <template v-if="!$v.info.password.$invalid">
                            <p v-if="!isPasswordOkay" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Password must be 4 character long. </span>
                            </p>
                        </template>

                    </template>
                    

                    <!-- Confirm Password -->
                    <template>
                        <div class="input-group form-group" id="passConfirm">
                            <label class="sr-only" for="formConfirmPassword">Confirm Password</label>
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <i class="fas fa-lock fa-fw"></i> </div>
                            </div>

                            <input
                                @blur="$v.info.confirmPassword.$touch()"
                                v-model="info.confirmPassword"
                                class="form-control" 
                                id="formConfirmPassword" 
                                placeholder="Confirm Password" 
                                name="confirmPassword"
                                type="password"
                            >

                            <template v-if="!$v.info.confirmPassword.$invalid && isPasswordMatch">
                                <div class="input-group-append">
                                    <div class="input-group-text" style="color: green">
                                        <i class="fas fa-check-circle fa-fw"></i>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <template v-if="$v.info.confirmPassword.$error">
                            <p v-if="!$v.info.confirmPassword.$required" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Confirm Password required </span>
                            </p>
                        </template>
                        <template v-if="!$v.info.confirmPassword.$invalid">
                            <p v-if="!isPasswordMatch" class="errorMessage text-left">
                                <i class="fas fa-exclamation-triangle fa-lg"></i>
                                <span> Password did not match </span>
                            </p>
                        </template>
                        
                    </template>
                    
                    
                    <!-- Sign up button -->
                    <template>
                        <button 
                            @click="$v.$touch()"
                            :disabled="$v.$anyError"
                            type="submit" 
                            class="btn btn-success btn-lg btn-block"
                        >
                            Sign Up
                        </button>
                    </template>
                    

                    <!-- Log in link -->
                    <div id="goLogin">
                        <p>
                            <span> Already have an accout? </span>
                            <router-link :to="{ name: 'LogIn'}" > <a>Log-in Here</a> </router-link>
                            <!-- <a href="/login">Log-in Here</a> -->
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
                    password: '',
                    confirmPassword: ''
                }
            }
        },
        validations: {
            info: {
                    username: { required },
                    password: { required },
                    confirmPassword: { required }
                }
        },
        methods: {
            signup(){
                NProgress.start();
                NProgress.done()
            }
        },
        computed: {
            isPasswordMatch(){
                return this.info.password === this.info.confirmPassword && this.info.password.length !== 0;
            },
            isPasswordOkay(){
                return this.info.password.length > 3;
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

    form .input-group-text {
        background-color: rgb(224, 221, 215);
    }

    #goLogin {
        text-align: right;
        margin-top: 5%;
        margin-right: 10px;
    }

    #goLogin a {
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

    .remove-right-border{
        border-right: none;
    }

    .field-correct {
        border-left: none;
        color: green;
        background-color: white;
    }
</style>