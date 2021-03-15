<template>
    <div>
        <v-row>
            <v-col cols="12" v-for="c in chatList" :key="c.id">
                <v-card @click="openChat(c.id)" class="pa-4">
                    <v-avatar :color="getRandomColor()" rounded>{{ getAvatar(c.username) }}</v-avatar> {{ c.username }}
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { bus } from '@/main'
import UserService from '@/services/UserService'
import ChatService from '@/services/ChatService'


export default {
    data() {
        return {
            chatList: [],
            colors: ['red', 'purple', 'blue', 'cyan', 'brown', 'green']
        }
    },
    created: function () {
        var user = UserService.getUserObject()
        bus.$emit('setTitle', user.username)
        this.getChatList()
    },
    methods: {
        getChatList: function () {
            ChatService.getChatList().then(
                (response) => {
                    if (response == null) { return }
                    var status = response.data.status
                    if (status.code == 200) {
                        this.chatList = []
                        
                        response.data.data.chats.forEach(e => {
                            this.chatList.push(e)
                        })
                    }
                }
            )
        },
        openChat: function (id) {
            this.$router.push('/chat/' + id)
        },
        getAvatar: function (name) {
            return name.substring(0, 1)
        },
        getRandomColor: function () {
            var num = this.randomNumber(this.colors.length)
            return this.colors[num]
        },
        randomNumber: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    } 
}
</script>