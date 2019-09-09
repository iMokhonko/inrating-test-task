import UserApi from '../../api/UserApi'

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers({ users }) {
            return users;
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        }
    },
    actions: {
        loadUsers({ commit }) {
            const users = UserApi.getUsers();
            commit('setUsers', users);
        },
        addUser({ commit }, user) {
            UserApi.addUser(user);
        },
        deleteUser({ commit }, userId) {
            UserApi.deleteUser(userId);
            const users = UserApi.getUsers();
            commit('setUsers', users);
        },
        getUser({ commit }, userId) {
            return UserApi.getUser(userId);
        },
        addOrEditUser({ commit }, user) {
            UserApi.addOrEditUser(user);
        }
    }
}