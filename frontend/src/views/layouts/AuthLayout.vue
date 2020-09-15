<template>
    <div class="container">
        <div class="auth-container">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuthLayout"
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth-container {
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        width: 100%;
    }
</style>