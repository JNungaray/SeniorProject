<template>
    <div>
        <h3>Welcome to WeCrypt!</h3>
        <p>
            Here, security is our number one priority.<br>
            No longer do you have to fear about who is reading your messages or looking at your chat history.
            All you need to focus on is your conversation with those you are talking to.
        </p>
        <br>
        <p>
            Currently we are still in very early beta are are trying to work out some kinks.<br>
            We may not be up and running yet, but once we are you will fall in love with the security you get from us.
        </p>
    </div>
</template>
<script>
import { bus } from '@/main'
export default {
    created: () => {
        bus.$emit('setTitle', 'FAQ')
    }
}
</script>