import axios from 'axios'
import UserService from '@/services/UserService'

const ChatService = {
    getChatList () {
        if(!UserService.verifyUser()) {
            return null
        }
        var user = UserService.getUserObject()
        var data = {
            user_id: user.id,
            action: "getChats"
        }
        return axios({
            url: 'http://localhost:8888/api/ChatController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    },

    getMessages (otheruser) {
        if(!UserService.verifyUser()) {
            return null
        }
        var user = UserService.getUserObject()
        var data = {
            user_id: user.id,
            other_user: otheruser,
            action: "getMessages"
        }
        return axios({
            url: 'http://localhost:8888/api/ChatController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    },

    sendMessage (otheruser, message) {
        if(!UserService.verifyUser()) {
            return null
        }
        var user = UserService.getUserObject()
        var data = {
            user_id: user.id,
            other_user: otheruser,
            message: message,
            action: "sendMessage"
        }
        return axios({
            url: 'http://localhost:8888/api/ChatController.php',
            method: "post",
            data: JSON.stringify(data)
        })
    },
}

export default ChatService