<template>
    <form class="register-form" @submit.prevent="sendRegisterData">
        <h1>Register Form</h1>
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
        <div class="form-component">
            <label for="repeat_password">Repeat password</label>
            <input id="repeat_password" type="password" class="form-component-input" v-model="password_repeat" placeholder="Repeat password...">
            <span class="help-text" v-if="errors['password_repeat']">{{errors['password_repeat']}}</span>
        </div>
        <div class="form-component centered">
            <button type="submit" class="form-component-submit">Register</button>
        </div>
        <div class="form-component centered">
            <router-link to="/auth/login" class="form-component-link">Already have an account?</router-link>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Register",
    data() {
        return {
            username: '',
            password: '',
            password_repeat: ''
        }
    },
    computed: {
        ...mapGetters({
            'errors': 'auth/getErrors'
        })
    },
    methods: {
        ...mapActions({
            'registerUser': 'auth/registerUser'
        }),

        sendRegisterData() {
            this.registerUser(this.$data);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/form";

    .register-form {
        width: 100%;
        padding: 20px 40px;
    }
</style>