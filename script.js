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