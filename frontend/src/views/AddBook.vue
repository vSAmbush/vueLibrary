<template>
    <div class="container">
        <form id="add-book-form" class="add-book-form" @submit.prevent="addNewBook">
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

export default {
    name: "AddBook",
    data() {
        return {
            title: '',
            overview: '',
            wrap_color: this.randomBookColor(),
            errors: {}
        }
    },
    methods: {
        addNewBook() {
            fetch(Config.restDomainUrl + '/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.$data)
            })
            .then(response => response.json())
            .then(result => {
               if (Array.isArray(result) && result.length) {
                   this.errors = [];
                    for (let error of result) {
                        this.errors[error.field] = error.message;
                    }
               } else {
                   this.$router.push('/');
               }
            });
        },
        randomBookColor() {
            return Config.colorSet[Math.floor(Math.random() * Config.colorSet.length)];
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/general';

    .add-book-form {
        display: flex;
        flex-direction: column;
    }

    .form-component {
        display: flex;
        flex-direction: column;
        margin: 20px 0 10px 0;

        & label {
            font-size: 24px;
        }

        & textarea {
            height: 120px;
        }

        & input[type=color] {
            border-bottom: none;
            width: 100%;
            background-color: $main-text-color;
        }

        &-input {
            border: none;
            border-bottom: 2px solid $main-bg-color;
            height: 50px;
            outline: none;
            font-size: 20px;
            resize: none;
        }

        &-submit {
            border: none;
            height: 50px;
            width: 300px;
            max-width: 100%;
            background-color: $special-color;
            color: $main-text-color;
            border-radius: 5px;
            font-size: 20px;
            outline: none;
        }

        .help-text {
            color: red;
            font-weight: bold;
            margin: 15px 0 0 0;
        }
    }
</style>