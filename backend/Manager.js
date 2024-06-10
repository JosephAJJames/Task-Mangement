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

    checkUserExists(user) {}
}
module.exports = Server_Manager