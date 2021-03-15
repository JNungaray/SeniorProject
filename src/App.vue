<template>
  <v-app id="app">
    <v-app-bar app dense flat>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-if="loggedIn">
          <v-list-item @click="$router.push('/')">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/faq')">
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-if="!loggedIn">
          <v-list-item @click="$router.push('/login')">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/register')">
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/faq')">
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="mt-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService'
import { bus } from '@/main'

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      title: '',
      loggedIn: false
    }
  },
  created: function () {
    bus.$on('setTitle', function (e) {
      this.title = e
    })

    var logged = UserService.verifyUser()
    if (!logged) {
      this.loggedIn = false
    } else {
      this.loggedIn = true
    }
  },
  watch: {
    '$route': function (n, o) {
      if(n != o) {
        var logged = UserService.verifyUser()
        if (!logged) {
          this.loggedIn = false
        } else {
          this.loggedIn = true
        }
      }
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
