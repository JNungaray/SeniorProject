<style scoped>
    .chat {
        min-height: 50px;
        padding: 4px 6px;
        max-width: 80%;
        min-width: 30%;
    }
    .chat-me {
        background-color:#beedeb;
        border-radius: 10px 10px 0px 10px;
        float: right;
    }

    .chat-them {
        background-color:#afc98f;
        border-radius: 10px 10px 10px 0px;
        float: left;
    }
</style>
<template>
    <div>
        <v-row style="max-height:80vh" class="px-4 my-0">
            <v-col cols="12" v-for="c in chat" :key="c.id">
                <div :class="c.from == id ? 'chat-them' : 'chat-me'" class="chat">
                    {{ c.message }}
                </div>
            </v-col>
        </v-row>
        <v-row style="position:absolute; bottom: 0; left: 0; width:100%; max-height:11vh" class="px-4 my-0">
            <v-col cols="9" md="10">
                <v-text-field v-model="message" outlined></v-text-field>
            </v-col>
            <v-col cols="3" md="2">
                <v-btn outlined rounded @click="sendMessages()">Send</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { bus } from '@/main'
import ChatService from '@/services/ChatService'

export default {
    props: {
        id: String
    },
    data() {
        return {
            chat: [],
            message: ''
        }
    },
    created: () => {
        bus.$emit('setTitle', 'Chat')
    },
    mounted: function () {
        this.getMessages()
    },
    methods: {
        sendMessages: function () {
            var chats = JSON.parse(localStorage.getItem('chat_'+ this.id))
            if (!chats) {
                chats = []
            }
            if (this.message.trim() != '' && this.message.length <= 200) {

                ChatService.sendMessage(this.id, this.message).then(
                    (response) => {
                        if (response == null) { return }
                        var status = response.data.status
                        if (status.code == 200) {
                            this.getMessages()
                        }
                    }
                )
            }
            this.message = ''
        },
        getMessages: function () {
            ChatService.getMessages(this.id).then(
                (response) => {
                    if (response == null) { return }
                    var status = response.data.status
                    if (status.code == 200) {
                        var messages = response.data.data.messages

                        this.chat = []
                        messages.forEach(e => {
                            this.chat.push(e)
                        });
                    }
                }
            )
        }
    }
}
</script>