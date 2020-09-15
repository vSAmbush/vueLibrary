<template>
    <div class="nav-bar">
        <router-link class="nav-bar-link" to="/">Library</router-link>
        <router-link v-if="!isAuthenticated" class="nav-bar-link" to="/auth/login">Login</router-link>
        <a v-else class="nav-bar-link" type="button" @click="invokeLogout">Hi, {{user.username}}! (Logout)</a>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Navbar",
    computed: {
        ...mapGetters({
            'isAuthenticated': 'auth/isAuthenticated',
            'user': 'auth/getUser'
        })
    },
    methods: {
        ...mapActions({
            'logoutUser': 'auth/logoutUser'
        }),

        invokeLogout() {
           this.logoutUser();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/general";

    .nav-bar {
        width: 100%;
        height: 50px;
        position: fixed;
        padding: 0 35px;
        background: $main-bg-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;

        &-link {
            font-size: 20px;
        }
    }
</style>