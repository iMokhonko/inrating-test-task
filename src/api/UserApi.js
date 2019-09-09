export default class User {
    static addUser(user) {
        const users = this.getUsers();
        if(users.length !== 0)
            user.userId = users[users.length - 1].userId + 1;
        else
            user.userId = 1;
        users.push(user);
        this.setUsers(users);
    }

    static deleteUser(userId) {
        const users = this.getUsers();
        const userDeleteIndex = users.findIndex(user => user.userId === userId);
        users.splice(userDeleteIndex, 1);
        this.setUsers(users);
    }

    static editUser(user) {
        const { userId } = user;
        const users = this.getUsers();
        const editUserIndex = users.findIndex(user => user.userId === userId);
        users.splice(editUserIndex, 1, user);
        this.setUsers(users);
    }

    static addOrEditUser(user) {
        const { userId } = user;
        if(userId) {
            this.editUser(user);
        } else {
            this.addUser(user);
        }
    }

    static getUser(userId) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.userId === userId);
        return users[userIndex];
    }

    static getUsers() {
        const users = JSON.parse(localStorage.getItem('users'));
        return users ? users : [];
    }

    static setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

}