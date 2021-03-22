import axios from 'axios'

const UserService = {
    verifyUser () {
        const user = this.getUserObject()
        if (!user || !user.id) {
            return false
        } else {
            return true
        }
    },

    setUser (user) {
        localStorage.setItem('user', JSON.stringify(user))
    },

    getUserObject () {
        const temp = localStorage.getItem('user')
        if (temp !== null) {
          return JSON.parse(localStorage.getItem('user'))
        } else {
          return null
        }
    },

    login (data) {
        data.action = "login"
        return axios({
            url: 'http://localhost:8888/api/UserController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    },

    register (data) {
        data.action = "register"
        return axios({
            url: 'http://localhost:8888/api/UserController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    },

    searchUsers (term) {
        if (!this.verifyUser()) {
            return {
                data: {
                    status: 405
                }
            }
        }
        var data = {
            term: term,
            action: 'search',
            id: this.getUserObject().id
        }

        return axios({
            url: 'http://localhost:8888/api/UserController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    }
}

export default UserService