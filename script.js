const localUsers = localStorage.getItem('users');

const holderUsers = {
    createUser(){
        const users = [];
        if((localUsers === false)||(localUsers === null) || (localUsers.length === 0)){
            const newUser = new this.buildUser("user1",1);
            const newUser2 = new this.buildUser("user2",2);
            users.push(newUser);
            users.push(newUser2);
            localStorage.setItem("users",JSON.stringify(users));
        }
    },
    buildUser: function(name,id){
        this.name = name
        this.id = id
    },
}
holderUsers.createUser();

const server = {
    cables: [],
    passToCable(userId, package) { },
    receivedPackages: [],
    sendPackages() { },
}

class Cable {
    constructor(userId) {
        this.id = userId;
        this.currentPack = false;
    }
    sendToUser() {
    }
    sendToServer() {
        server.receivedPackages.push(this.currentPack);
    }
}

class package {
    constructor(msg, origin, receiver) {
        this.msg = msg;
        this.origin = origin;
        this.receiver = receiver;
    }
}

class Client {
    constructor(user) {
        
    }
    sendMsg() {

    }
    receiveMsg() {

    }
}