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
                        <v-col cols="12" class="px-6 py-0">
                            <v-text-field
                                type="password"
                                v-model="form.passwordagain"
                                label="Re-enter Password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn outlined rounded @click="register()">Register</v-btn>
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
                password: '',
                passwordagain: ''
            },
            message: ''
        }
    },
    created: () => {
        bus.$emit('setTitle', 'Register')
    },
    methods: {
        register: function () {
            if (this.form.password.trim() == '' || this.form.password != this.form.passwordagain) {
                this.message = "Password is invalid or does not match"
            }

            var data = {
                username: this.form.username,
                password: this.form.password,
                repassword: this.form.passwordagain
            }

            UserService.register(data).then(
                (request) => {
                    var status = request.data.status

                    if (status.code == 200) {
                        this.$router.push('/login')
                    } else {
                        this.message = status.message
                    }
                }
            )
        }
    }
}
</script>