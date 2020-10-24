import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    user: {
        id: '',
        username: '',
    },
    userLoggedIn: false,
    isAdmin: false
}

export const mutations = {
    ADD_ID (state, id){
        state.user['id'] = id;
    },
    DELETE_ID (state){
        state.user['id'] = '';
    },

    ADD_USERNAME (state, username){
        state.user['username'] = username;
    },
    DELETE_USERNAME (state){
        state.user['username'] = '';
    },

    UPDATE_USERLOGGEDIN (state, b){
        state.userLoggedIn = b;
    },

    UPDATE_ISADMIN (state, b){
        state.isAdmin = b;
    }
}

export const actions = {
    LogInUser ({ commit }, user){
        return EventService.getUser(user)
            .then((response) => {
                commit('ADD_ID', response.id);
                commit('ADD_USERNAME', response.username);
                commit('UPDATE_USERLOGGEDIN', true);
                commit('UPDATE_ISADMIN', response.isAdmin);
                return {isAdmin: response.isAdmin}
            })
            .catch(error => {
                throw error
            })
    },
    LogOutUser ({ commit }){
        commit('DELETE_ID');
        commit('DELETE_USERNAME');
        commit('UPDATE_USERLOGGEDIN', false);
        commit('UPDATE_ISADMIN', false);
    }

    
}