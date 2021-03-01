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
    methods: {
        register: function () {
            var valid = true;
            var users = JSON.parse(localStorage.getItem('users'))
            if (users) {
                users.forEach(e => {
                    if (e.username == this.form.username) {
                        valid = false
                        this.message = "Username is taken"
                    }
                })
            }

            if (this.form.password.trim() == '' || this.form.password != this.form.passwordagain) {
                this.message = "Password is invalid or does not match"
            }

            if (valid) {
                if (!users) {
                    users = []
                }
                users.push({username: this.form.username, password: this.form.password})
                localStorage.setItem('users', JSON.stringify(users))
                this.$router.push('/')
            }
        }
    }
}
</script>