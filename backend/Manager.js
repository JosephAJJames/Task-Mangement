const axios = require("axios")

class Server_Manager {
    constructor() {}

    async rootCheck() {
        try {
            const res = await axios.get("http://127.0.0.1:8080/")
            return res.data
        } catch (e) {
            return "fail"
        }
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

    async addTask(title, description, due_date) {
        const res = await axios.post("http://127.0.0.1:8080/addtask", {
            title:title,
            description:description,
            due_date:due_date
        }, {
            Headers : {
                'Content-Type':'application'
            }
        })

        return res
    }
}
module.exports = Server_Manager