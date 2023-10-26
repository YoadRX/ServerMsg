const localUsers = localStorage.getItem('users');

const server = {
    users: localUsers,
    cables: [],
    receivedPackages: [],
    passToCable(userId, package) {
        console.log(package + " is being passed to a cable");
        for (let i = 0; i < this.cables.length; i++) {
            if (this.cables[i]["id"] == userId) {
                console.log("found the right user");
                let sent = false;
                const sendHelper = () => {
                    if (!this.cables[i]["currentPack"]) {
                        this.cables[i]["currentPack"] = package;
                        this.cables[i].sendToUser();
                        console.log("passed from server");
                        sent = true;
                    }
                }
                while (!sent) {
                    if (this.cables[i]["currentPack"]) {
                        setTimeout(sendHelper, 3000);
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
        for (let i = 0; i < this.receivedPackages.length; i++) {
            const cableId = this.receivedPackages[i]["receiver"];
            this.passToCable(cableId, this.receivedPackages[i]);
            this.receivedPackages.splice(i, 1);
            console.log("sending the packages");
        }
    }
}

class Cable {
    constructor(userId) {
        this.id = userId;
        this.currentPack = false;
    }
    sendToUser() {
        for (let i = 0; i < server.users.length; i++) {
            if (server.users["id"] === this.id) {
                server.users["client"].receiveMsg(this.currentPack);
                this.currentPack = false;
                console.log("passed to user client");
                return;
            }
        }
    }
    sendToServer() {
        server.receivedPackages.push(this.currentPack);
        server.sendPackages();
        console.log("passed to server");
    }
}

class Client {
    constructor() { }
    sendMsg() {

    }
    receiveMsg(msg) {
        alert(msg);
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
            server.users = users;
        }
    },
    buildUser: function (name, id) {
        this.name = name
        this.id = id
        this.Client = new Client();
        server.cables.push(new Cable(id));
    },
}

holderUsers.createUser();