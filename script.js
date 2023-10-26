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

