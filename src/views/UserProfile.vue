<template>
    <div>
        <h1>User page</h1>
        <p v-if="authService.userLoggedIn"> {{ authService.user.username }} are logged in </p>
        <p v-else> You are not logged in </p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState(['authService'])
        }
    }
</script>

<style lang="css" scoped>

</style>