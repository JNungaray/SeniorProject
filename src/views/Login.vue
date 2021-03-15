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
import UserService from '@/services/UserService'
import { bus } from '@/main'

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
    created: () => {
        bus.$emit('setTitle', 'Login')
    },
    methods: {
        login: function () {
            var data = {
                username: this.form.username,
                password: this.form.password
            }
            UserService.login(data).then(
                (response) => {
                    var status = response.data.status
                    if (status.code == 200) {
                        UserService.setUser(response.data.data)
                        this.$router.push('/')
                    } else {
                        this.message = status.message
                    }
                }
            )
        }
    }
}
</script>