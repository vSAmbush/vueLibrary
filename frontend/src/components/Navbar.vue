<template>
    <div class="nav-bar">
        <router-link class="nav-bar-link" to="/">Your Library</router-link>
        <router-link class="nav-bar-link" to="/auth/login">Login</router-link>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
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