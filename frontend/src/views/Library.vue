<template>
    <div class="container">
        <div class="library">
            <router-link to="/add-book">
                <div class="add-btn-container">
                    <span>Add New Book</span>
                    <a class="add-btn"><i class="fas fa-plus"></i></a>
                </div>
            </router-link>
            <Loader v-if="!Object.keys(this.allShelves).length"/>
            <Shelf v-else v-for="(shelf, key, index) of allShelves" :ref="shelf + index" :shelf="shelf" :label="key" :key="index"/>
        </div>
    </div>
</template>

<script>
import Shelf from "../components/Shelf";
import { mapActions, mapGetters } from "vuex";
import Loader from "../components/Loader";

export default {
    name: "Library",
    components: {
        Loader,
        Shelf
    },
    computed: {
        ...mapGetters({
            allShelves: 'book/getShelves'
        })
    },
    methods: {
        ...mapActions({
            fetchAllShelves: 'book/fetchAllOrderedBooks'
        })
    },
    mounted() {
        this.fetchAllShelves();
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/general";

    .library {
        width: 100%;
    }

    $btn-size: 40px;
    .add-btn {
        width: $btn-size;
        height: $btn-size;
        border-radius: 50%;
        background-color: $special-color;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $main-text-color !important;
        font-size: 18px;
        font-weight: bold;
        position: relative;

        &:after {
            position: absolute;
            z-index: -1;
            content: "";
            width: 100%;
            height: 100%;
            background-color: $special-color;
            border-radius: 50%;
            animation: 1.1s ease-out infinite pulsing;
        }

        &-container {
            display: flex;
            justify-content: center;

            & span {
                font-size: 24px;
                font-weight: bold;
                margin: 0 15px;
                display: flex;
                color: black;
                align-items: center;
            }
        }
    }
</style>