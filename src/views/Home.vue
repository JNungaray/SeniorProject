<template>
    <div>
        <v-row>
            <v-col cols="12" v-for="c in chatList" :key="c.id">
                <v-card @click="openChat(c.id)" class="pa-4">
                    <v-avatar :color="getRandomColor()" rounded>{{ getAvatar(c.name) }}</v-avatar> {{ c.name }}
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chatList: [
                {id: 1, name:'Some Dude'},
                {id: 2, name:'Another Dude'}
            ],
            colors: ['red', 'purple', 'blue', 'cyan', 'brown', 'green'],
            usedNumbers: []
        }
    },
    methods: {
        openChat: function (id) {
            this.$router.push('/chat/' + id)
        },
        getAvatar: function (name) {
            return name.substring(0, 1)
        },
        getRandomColor: function () {
            if (this.usedNumbers.length == this.colors.length) {
                this.usedNumbers = []
            }
            var num = this.randomNumber(this.colors.length)
            for (var i = 0; i < 10; i++) {
                num = this.randomNumber(this.colors.length)
                if (!this.usedNumbers.includes(num)) {
                    break
                }
            }
            this.usedNumbers.push(num)
            return this.colors[num]
        },
        randomNumber: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    } 
}
</script>