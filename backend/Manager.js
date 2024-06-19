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

    async checkUserExists(userUsername, userPassword, userName) {
        const res = await axios.post("http://127.0.0.1:8080/checkuserexists", {
            user:userUsername, 
            password:userPassword,
            name:userName
        }, {
            Headers : {
                'Content-Type': 'application/json'
            }
        })

        return res
    }

    async addUser(userUsername, userPassword, userName) {
        const res = await axios.post("http://127.0.0.1:8080/adduser", {
            user:userUsername, 
            password:userPassword,
            name:userName
        }, {
            Headers : {
                'Content-Type': 'application/json'
            }
        })

        return res
    }

    async getUsersName(userName) {
        const res = await axios.get("http://127.0.0.1:8080/getname" , {
            params: {
                username: userName
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.data
    }
}
module.exports = Server_Manager