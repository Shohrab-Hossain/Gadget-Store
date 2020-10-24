<template>
    <div>
        <!-- nav bar -->
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark cut-padding-custom">
            <div class="container">
                <div class="row align-items-center">
                    <router-link :to="{name: 'ProductsDisplay'}">
                        <a class="navbar-brand">
                            <i class="fab fa-opencart"></i>
                            <span> Gadget Store </span>
                        </a>
                    </router-link>
                    

                    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <div class="navbar-nav ml-auto align-items-center">
                            
                            <template v-if="userLoggedIn && isAdmin">
                                <router-link :to="{name: 'AdminDashboard'}">
                                    <a class="nav-item nav-link" href="#">
                                        Admin Panel
                                    </a>
                                </router-link>
                            </template>
                            <template v-if="userLoggedIn && !isAdmin">
                                <router-link :to="{name: 'UserProfile'}">
                                    <a class="nav-item nav-link" href="#">
                                        Profile
                                    </a>
                                </router-link>
                            </template>

                            <router-link :to="{name: 'LogIn'}">
                                <span class="nav-item nav-link" href="#">
                                    Log-in
                                </span>
                            </router-link>

                            <router-link :to="{name: 'SignUp'}">
                                <span class="nav-item nav-link" href="#">
                                    Sign-up
                                </span>
                            </router-link>
                            
                            <!-- Button trigger Modal - Cart details -->
                            <a class="nav-item nav-link" href="#">
                                <a href="#" type="button" class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#staticCartDetails">
                                    <i class="fas fa-shopping-cart fa-fw"></i>
                                    Cart
                                    <span v-if="cart['itemIDs'].length != 0" class="badge badge-light"> {{ cart['itemIDs'].length }} </span>
                                </a>
                            </a>

                            <form class="form-inline">
                                <input class="form-control mr-sm-2 col-7" type="search" placeholder="I'm looking for" aria-label="Search">
                                <button class="btn btn-outline-success my-2 my-sm-0 col-4" type="submit">Search</button>
                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- ^ nav bar -->

        <!-- Modal - Cart details -->
        <div class="modal fade" id="staticCartDetails" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            <i class="fas fa-shopping-basket"></i>
                            Your basket
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="cart['itemIDs'].length === 0" id="cartNoItem">
                            <h3> Your basket is empty </h3>
                        </div>
                        <div v-else id="cartTable">
                            <h5> Product list </h5>
                            <table>
                                <tr>
                                    <th> Product Name </th>
                                    <th> Quantity </th>
                                    <th> Price </th>
                                    <th> Type </th>
                                    <th> Total </th>
                                </tr>
                                <tr v-for="itemID in cart['itemIDs']" :key="itemID">
                                    <td> {{ cart['details'][itemID].name }} </td>
                                    <td> {{ cart['details'][itemID].quantity }} </td>
                                    <td> {{ cart['details'][itemID].price }} </td>
                                    <td> {{ cart['details'][itemID].type }} </td>
                                    <td> {{ cart['details'][itemID].total }} </td>
                                </tr>
                                <tr>
                                    <td colspan="3"> </td>
                                    <td> Total Bill </td>
                                    <td> {{ cart.totalBill }} </td>
                                </tr>
                            </table>
                            <p> * press the "Next" button to proceed for the payment process. </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button v-if="cart['itemIDs'].length != 0" 
                                type="button"
                                class="btn btn-success">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal - Cart details -->
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "BaseNavbar",
    props: {
        
    },
    computed: {
        ...mapState('cart', ['cart']),
        ...mapState('authService', ['isAdmin', 'userLoggedIn'])
    }
}
</script>

<style scoped>
    /* ---------- navbar ---------- */
        nav .row {
            width: 100vw;
            padding-left: 15px;
            padding-right: 15px;
        }

        .navbar-brand {
            margin-left: 15px;
        }

        .navbar-brand span {
            font-family: 'Fugaz One';
            font-size: x-large;
        }

        .navbar-nav a {
            text-decoration: none;
            /* width: 80px; */
            /* font-family: 'Acme'; */
            letter-spacing: 1px;
            text-align: center;
        }

        .navbar-nav a:last-of-type a {
            margin-right: 10px;
            width: 120px;
            max-width: 160px;
            color: white;
            font-family: 'Merienda One';
            box-shadow: none;
        }

        .navbar-nav form input[type="search"] {
            margin-right: 8px;
        }

        .cart-button {
            padding: 20px;
            text-align: right;
            background-color: rgb(204, 240, 240);
        }
        
        .cart-button a {
            color: rgb(2, 87, 87);
            width: 120px;
            max-width: 150px;
        }
        
        .modal-title {
            font-family: 'Merienda One';
            color: rgb(7, 80, 80);
        }
        
        #cartNoItem {
            margin: 60px auto;
            text-align: center;
            color: #3d3d3d;
            font-family: 'Bad Script';
        }
        
        #cartTable {
            text-align: center;
        }
        
        #cartTable h5 {
            margin-top: 10px;
            color: #5c5a5a;
            font-family: 'Amaranth';
        }
        
        #cartTable table {
            margin-top: 15px;
            width: 100%;
            font-family: arial, sans-serif;
            border-collapse: collapse;
        }
        
        #cartTable th {
            padding: 12px 8px;
            border: 1px solid #dddddd;
            background-color: #c7c2c2;
            color: #3b3b3b;
            font-family: 'Bad Script';
            text-align: center;
        }
        
        #cartTable td {
            padding: 8px;
            border: 1px solid #dddddd;
            font-family: 'ubuntu';
            text-align: center;
        }
        
        #cartTable tr td:last-child {
            min-width: 70px;
        }
        
        #cartTable tr:nth-child(odd) {
            background-color: #f3f1f1;
        }
        
        #cartTable tr:last-child td {
            padding: 10px 8px;
            background-color: #dfdddd;
            font-family: 'Amaranth';
        }
        
        #cartTable tr:last-child td:first-child {
            border-right: none;
        }
        
        #cartTable p {
            margin-top: 35px;
            font-weight: 400;
            color: #4d4c4c;
            text-align: left;
        }

        .cut-padding-custom {
            padding-left: 0;
            padding-right: 0;
        }

    /* ---------- ^ navbar ---------- */
</style>