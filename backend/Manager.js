const axios = require("axios")

class Server_Manager {
    constructor() {}

    rootCheck() {
        axios.get("http://127.0.0.1:8080/").then((res) => {
            console.log(res.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    async checkUserExists(userUsername, userPassword) {
        const res = await axios.post("http://127.0.0.1:8080/login", {
            user:userUsername, 
            password:userPassword
        }, {
            Headers : {
                'Content-Type': 'application/json'
            }
        })

        return res
    }

    async addUser(userUsername, userPassword) {
        const res = await axios.post("http://127.0.0.1:8080/adduser", {
            user:userUsername, 
            password:userPassword
        }, {
            Headers : {
                'Content-Type': 'application/json'
            }
        })

        return res
    }

    async getUsersName(username) {
        return;
    }
}
module.exports = Server_Manager