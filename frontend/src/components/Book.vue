<template>
    <router-link :to="'/book/' + book.id">
        <div class="book" :style="{'background-color': book.wrap_color}">
            <h1 class="book-title">{{book.title}}</h1>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Book",
    props: {
        book: Object
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/general";

    .book {
        padding: 20px;
        color: $main-text-color;
        border-radius: 10px;
        margin: 0 7px;
        max-height: 250px;
        max-width: 150px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

        &-title {
            margin: 0;
            writing-mode: vertical-rl;
            white-space: pre-wrap;
            font-size: 24px;
        }
    }
</style>