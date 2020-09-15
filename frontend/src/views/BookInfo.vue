<template>
    <div class="container">
        <div class="alert alert-success" role="alert" v-if="isSuccess">Book has been successfully updated!</div>
        <div class="wrap-title-container">
            <label for="book-wrap" class="book-wrap" :style="{'background-color': book.wrap_color}">
                <input id="book-wrap" type="color" class="invisible" :value="book.wrap_color" ref="bookColorPicker" @change="onColorChange">
                <h1>{{book.title}}</h1>
            </label>
            <div class="form-component book-title">
                <textarea class="form-component-input" v-model="book.title" />
                <span class="help-text" v-if="errors['title']">{{errors['title']}}</span>
            </div>
        </div>

        <div class="form-component overview-container">
            <label>Overview:</label>
            <textarea class="form-component-input" v-model="book.overview" />
            <span class="help-text" v-if="errors['overview']">{{errors['overview']}}</span>
        </div>

        <div class="actions-container">
            <button class="form-component-submit" @click="submitBookUpdate">Save updates</button>

            <button class="form-component-submit btn-cancel" @click="submitDeletingBook">Delete book</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "BookInfo",
    data() {
        return {
            book: {},
            successTimeout: null,
            isSuccess: false
        }
    },
    computed: {
        ...mapGetters({
            'errors': 'book/getErrors'
        })
    },
    methods: {
        ...mapActions({
            'fetchBookById': 'book/fetchBookById',
            'updateBookInfo': 'book/updateBookInfo',
            'deleteBook': 'book/deleteBook',
            'clearErrors': 'book/clearErrors'
        }),

        submitBookUpdate() {
            clearTimeout(this.successTimeout);

            this.updateBookInfo(this.book).then(() => {
                this.isSuccess = !Object.keys(this.$store.getters['book/getErrors']).length;
                if (this.isSuccess) {
                    this.successTimeout = setTimeout(() => this.isSuccess = false, 1100);
                }
            });
        },
        submitDeletingBook() {
            if (confirm('Are you sure you want to delete the book?')) {
                this.deleteBook(this.book.id);
            }
        },
        onColorChange() {
            this.book.wrap_color = this.$refs.bookColorPicker.value;
        }
    },
    async mounted() {
        await this.fetchBookById(this.$route.params.id);

        this.book = this.$store.getters['book/getCurrentBook'];
        this.book.overview = this.book.overview ? this.book.overview : 'Book\'s overview is empty!';
    },
    beforeRouteLeave(to, from, next) {
        this.clearErrors();

        next();
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/form";

    .wrap-title-container {
        display: flex;
        justify-content: space-between;

        @media (max-width: 550px) {
            flex-direction: column;
        }
    }

    $border-wrap-radius: 20px;
    .book-wrap {
        flex: 0.3;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: $border-wrap-radius;
        border-top-left-radius: $border-wrap-radius;
        padding: 0 20px;
        color: $main-text-color;
        cursor: pointer;

        @media (max-width: 550px) {
            flex: auto;
        }
    }

    .book-title {
        flex: 0.6;
        font-weight: bold;
        text-align: center;

        &.form-component{
            margin: 0;
        }

        & textarea {
            height: 100%;
            font-size: 72px;
        }

        @media (max-width: 550px) {
            & input {
                font-size: 50px;
                flex: 1;
            }
        }
    }

    .overview-container {
        padding-top: 20px;

        & p {
            font-size: 20px;
            margin: 0;
        }

        & textarea {
            min-height: 250px;
        }
    }

    .actions-container {
        margin: 30px 0;
        display: flex;
        justify-content: flex-end;
    }

    .btn-cancel {
        background-color: red;
        margin-left: 10px;
    }
</style>