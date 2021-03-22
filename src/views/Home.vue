<template>
    <div>
        <v-row>
            <v-col cols="12" v-for="(c, key) in chatList" :key="c.id">
                <v-card @click="openChat(c.id)" class="pa-4">
                    <v-avatar :color="mycolor[key]" rounded>{{ getAvatar(c.username) }}</v-avatar> {{ c.username }}
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                Start a new chat by searching for a username:
                <v-autocomplete
                    :items="userSearch"
                    :search-input.sync="search"
                    return-object
                    item-text="username"
                    :loading="loading"
                    :hide-no-data="!loading"
                    :filter="() => true"
                    clearable
                    @input="select"
                ></v-autocomplete>
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
            colors: ['red', 'purple', 'blue', 'cyan', 'brown', 'green'],
            loading: false,
            userSearch: [],
            search: null,
            timeout: null,
            mycolor: []
        }
    },
    created: function () {
        var user = UserService.getUserObject()
        bus.$emit('setTitle', user.username)
        this.getChatList()
    },
    watch: {
        search: function (n, o) {
            if (n != o) {
                if (n.length > 2) {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.searchUsers(n)
                    }, 300)
                } else {
                    this.userSearch = []
                }
            }
        }
    },
    methods: {
        getChatList: function () {
            ChatService.getChatList().then(
                (response) => {
                    if (response == null) { return }
                    var status = response.data.status
                    if (status.code == 200) {
                        this.chatList = []
                        
                        this.chatList = response.data.data.chats
                    }
                }
            ).finally( () => {
                this.chatList.forEach(el => {
                    this.mycolor.push(this.getRandomColor())
                    el.color = ''
                })
            })
        },
        searchUsers: function (term)
        {
            this.loading = true
            UserService.searchUsers(term.toLowerCase()).then(
                (response) => {
                    if (response.data.status.code == 200) {
                        this.userSearch = response.data.data
                    }
                }
            ).finally(() => { this.loading = false })
        },
        select: function (arg) {
            this.openChat(arg.id)
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