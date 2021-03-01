<template>
    <div>
        <v-row>
            <v-col md="3" cols="1"></v-col>
            <v-col md="6" cols="10">
                <v-card elevation="2">
                    <v-row>
                        <v-col cols="12" class="px-6 py-0">
                            <v-text-field
                                v-model="form.username"
                                label="Username"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="px-6 py-0">
                            <v-text-field
                                type="password"
                                v-model="form.password"
                                label="Password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn outlined rounded @click="login()">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="3" cols="1"></v-col>
        </v-row>
        <div style="color:red; text-align:center" v-if="message.length > 0">
            {{ message }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            message: ''
        }
    },
    methods: {
        login: function () {
            var isUser = false;
            var users = JSON.parse(localStorage.getItem('users'))
            if (users) {
                users.forEach(e => {
                    if (e.username == this.form.username && e.password == this.form.password) {
                        isUser = true
                    }
                })
            }

            if (isUser) {
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('username', this.form.username)
                localStorage.setItem('chat_1', JSON.stringify(
                    [
                        { from: 0, message: 'HEY!' },
                        { from: 1, message: 'Hello' },
                        { from: 0, message: 'How are you doing?' },
                        { from: 1, message: 'I\'m doing good, yourself?' }
                    ]
                ))
                localStorage.setItem('chat_2', JSON.stringify(
                    [
                        { from: 1, message: 'What up?' },
                        { from: 0, message: 'Hey' },
                        { from: 1, message: 'So we gonna me up later?' },
                        { from: 0, message: 'Sure. What time were you thinking?' },
                        { from: 1, message: 'Probably around 1 because I still need to go take my dog for a walk' }
                    ]
                ))
                this.$router.push('/')
            } else {
                this.message = 'Username or password is incorrect'
            }
        }
    }
}
</script>