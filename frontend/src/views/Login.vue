<template>
    <form class="login-form" @submit.prevent="sendLoginData">
        <h1>Login Form</h1>
        <div class="form-component">
            <label for="username">Username</label>
            <input id="username" type="text" class="form-component-input" v-model="username" placeholder="Enter username...">
            <span class="help-text" v-if="errors['username']">{{errors['username']}}</span>
        </div>
        <div class="form-component">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-component-input" v-model="password" placeholder="Enter password...">
            <span class="help-text" v-if="errors['password']">{{errors['password']}}</span>
        </div>
        <div class="form-component centered">
            <button class="form-component-submit">Log In</button>
        </div>
        <div class="form-component centered">
            <router-link to="/auth/register" class="form-component-link">Register?</router-link>
            <router-link to="/" class="form-component-link">Back to Library</router-link>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters({
            'errors': 'auth/getErrors'
        })
    },
    methods: {
        ...mapActions({
            'loginUser': 'auth/loginUser'
        }),

        sendLoginData() {
            this.loginUser(this.$data);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/form";

    .login-form {
        width: 100%;
        padding: 20px 40px;
    }
</style>