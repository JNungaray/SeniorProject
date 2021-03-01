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
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      title: this.$route.meta.title,
      loggedIn: false
    }
  },
  watch: {
    '$route': function (n, o) {
      if(n != o) {
        var logged = localStorage.getItem('loggedIn')
        if (!logged || logged != 'true') {
          this.loggedIn = false
        } else {
          this.loggedIn = true
        }
      }
    }
  },
  methods: {
    logout: function () {
      var users = localStorage.getItem('users')
      localStorage.clear()
      if (users) {
        localStorage.setItem('users', users)
      }
      this.$router.push('/login')
    }
  }
}
</script>
