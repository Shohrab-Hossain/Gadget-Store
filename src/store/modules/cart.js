export const namespaced = true

export const state = {
    cart: {
        itemIDs  : [],
        details  : {},
        totalBill: 0
    } 
}

export const mutations = {
    ADD_ITEMID (state, itemID){
        state.cart['itemIDs'].push(itemID);
    },
    DELETE_ITEMID (state, itemID){
        state.cart['itemIDs'].splice( state.cart['itemIDs'].indexOf(itemID), 1);
    },

    ADD_DETAILS (state, item){
        state.cart['details'][item.id] = item.data;
    },
    DELETE_DETAILS (state, itemID){
        delete state.cart['details'][itemID];
    },

    ADD_TOTALBILL (state, productPrice){
        state.cart['totalBill'] = Number( (state.cart['totalBill'] + productPrice).toFixed(2) );
    },
    REDUCE_TOTALBILL (state, productPrice){
        state.cart['totalBill'] = Number( (state.cart['totalBill'] - productPrice).toFixed(2) );
    },
}

export const actions = {
    updateCart ({ commit, state }, item){
        item['total'] = Number( (item.quantity * item.price).toFixed(2) );

        if( state.cart['itemIDs'].includes(item.id) ){
            commit('DELETE_ITEMID', item.id);
            commit('DELETE_DETAILS', item.id);
            commit('REDUCE_TOTALBILL', item.total);
        } else {
            item['quantity'] = 1;
            
            commit('ADD_ITEMID', item.id);
            
            let temp = {
                id: item.id,
                data: {
                    name: item.about.name,
                    quantity: item.quantity,
                    price: item.price,
                    type: item.type,
                    total: item.total
                }
            }
            commit('ADD_DETAILS', temp);
            
            commit('ADD_TOTALBILL', item.total);
        }
    }
}