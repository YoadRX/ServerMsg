const localUsers = localStorage.getItem('users');

const server = {
    cables: [],
    receivedPackages: [],
    passToCable(userId, package) {
        for (let i = 0; i < this.cables.length; i++) {
            if (this.cables[i]["id"] === userId) {
                let sent = false;
                const sendHelper = () => {
                    if (!this.cables[i]["currentPack"]) {
                        this.cables[i]["currentPack"] = package;
                        this.cables[i].sendToUser();
                        sent = true;
                    }
                }
                while (!sent) {
                    if (this.cables[i]["currentPack"]) {
                        setTimeout( sendHelper, 3000);
                    }
                    else {
                        sendHelper();
                    }
                }
                return;
            }
        }
    },
    sendPackages() { 
        for (let i=0; i<this.receivedPackages.length; i++) {
            const cableId = this.receivedPackages[i]["receiver"];
            this.passToCable(cableId, this.receivedPackages[i]);
            this.receivedPackages.splice(i, 1);
        }
    }
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

class Client {
    constructor(user) {

    }
    sendMsg() {

    }
    receiveMsg() {

    }
}

class MsgPackage {
    constructor(msg, origin, receiver) {
        this.msg = msg;
        this.origin = origin;
        this.receiver = receiver;
    }
}

const holderUsers = {
    createUser() {
        const users = [];
        if ((localUsers === false) || (localUsers === null) || (localUsers.length === 0)) {
            const newUser = new this.buildUser("user1", 1);
            const newUser2 = new this.buildUser("user2", 2);
            users.push(newUser);
            users.push(newUser2);
            localStorage.setItem("users", JSON.stringify(users));
        }
    },
    buildUser: function (name, id) {
        this.name = name
        this.id = id
        server.cables.push(new Cable(id));
    },
}

holderUsers.createUser();