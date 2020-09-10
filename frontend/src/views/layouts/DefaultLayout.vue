<template>
    <div id="default-layout">
        <Navbar />
        <div class="view-container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "../../components/Navbar";

export default {
    name: "DefaultLayout",
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>
    .view-container {
        padding-top: 80px;
    }
</style>