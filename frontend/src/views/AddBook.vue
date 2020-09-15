<template>
    <div class="container">
        <form id="add-book-form" class="add-book-form" @submit.prevent="submitNewBook">
            <div class="form-component">
                <label for="title">Book Title:</label>
                <input id="title" type="text" class="form-component-input" v-model="title" placeholder="Enter book title...">
                <span class="help-text" v-if="errors['title']">{{errors['title']}}</span>
            </div>
            <div class="form-component">
                <label for="overview">Overview:</label>
                <textarea id="overview" class="form-component-input" v-model="overview" placeholder="Enter overview..." />
                <span class="help-text" v-if="errors['overview']">{{errors['overview']}}</span>
            </div>
            <div class="form-component">
                <label for="wrap_color">Choose book's wrapper color</label>
                <input id="wrap_color" type="color" class="form-component-input" v-model="wrap_color">
                <span class="help-text" v-if="errors['wrap_color']">{{errors['wrap_color']}}</span>
            </div>

            <div class="form-component">
                <button type="submit" class="form-component-submit">Add New Book</button>
            </div>
        </form>
    </div>
</template>

<script>
import Config from "../config/config";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "AddBook",
    data() {
        return {
            title: '',
            overview: '',
            wrap_color: this.randomBookColor()
        }
    },
    computed: {
        ...mapGetters({
            errors: 'book/getErrors'
        })
    },
    methods: {
        ...mapActions({
            'addNewBook': 'book/addNewBook',
            'clearErrors': 'book/clearErrors'
        }),

        submitNewBook() {
            this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            this.addNewBook(this.$data);
        },
        randomBookColor() {
            return Config.colorSet[Math.floor(Math.random() * Config.colorSet.length)];
        }
    },
    beforeRouteLeave(to, from, next) {
        this.clearErrors();

        next();
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/form";

    .add-book-form {
        display: flex;
        flex-direction: column;
    }
</style>