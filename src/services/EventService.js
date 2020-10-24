import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    getProducts(page, perPage) {
        return apiClient.get(`/products?_page=${page}&_limit=${perPage}`);
    },
    deleteProduct(product) {
        return apiClient.delete(`/products/${product.id}`);
    },
    updateProduct(product) {
        return apiClient.put(`/products/${product.id}/`, product);
    },
    postProduct(product) {
        return apiClient.post('/products', product)
    },

    getUser(user) {
        return apiClient.get('/admin')
            .then(response => {
                if(response.data[0].username === user.username){
                    if(response.data[0].password === user.password){
                        return {...response.data[0], isAdmin: true}
                    } else {
                        throw "Credentials mismatch"
                    }
                } else {
                    return apiClient.get('/user')
                        .then(response => {
                            for(let i=0; i<response.data.length; i++){
                                if(response.data[i].username === user.username){
                                    if(response.data[i].password === user.password){
                                        return {...response.data[i], isAdmin: false}
                                    } else {
                                        throw "Credentials mismatch"
                                    }
                                }
                            }
                            throw "There is no user with that credentials."
                        })
                        .catch(error => {
                            throw error;
                        })
                }
            })
            .catch(error => {
                throw error;
            })
    },

    postUser(product) {
        return apiClient.post('/products', product)
    }
}
