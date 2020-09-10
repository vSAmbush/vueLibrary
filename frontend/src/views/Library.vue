<template>
    <div class="container">
        <div class="library">
            <router-link to="/add-book">
                <div class="add-btn-container">
                    <span>Add New Book</span>
                    <a class="add-btn"><i class="fas fa-plus"></i></a>
                </div>
            </router-link>
            <Shelf v-for="(shelf, key, index) of shelves" :shelf="shelf" :label="key" :key="index"/>
        </div>
    </div>
</template>

<script>
import Shelf from "../components/Shelf";
import Config from "../config/config";

export default {
    name: "Library",
    components: {
        Shelf
    },
    methods: {
        fetchBooks() {
            fetch(Config.restDomainUrl + '/books?per-page=50', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(unsortedBooks => {
                    if (unsortedBooks.length) {
                        let currentLabel = unsortedBooks[0].title.substr(0, 1);
                        this.shelves[currentLabel] = [];
                        for (let book of unsortedBooks) {
                            let tempLabel = book.title.substr(0, 1);

                            if (currentLabel !== tempLabel) {
                                currentLabel = tempLabel;
                                this.shelves[currentLabel] = [];
                            }

                            this.shelves[currentLabel].push(book);
                        }
                    }
                });
        }
    },
    data() {
        return {
            shelves: {}
        }
    },
    mounted() {
        this.fetchBooks();
    },
    updated() {
        this.fetchBooks();
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