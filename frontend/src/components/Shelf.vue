<template>
    <div class="shelf" :class="{'shelf-overflowed': isOverflowed}">
        <div class="shelf-content" ref="shelfContent">
            <Book v-for="book of shelf" :book="book" :key="book.id" />
            <span/>
        </div>
        <div class="shelf-label shelf-label-left"><span>{{label}}</span></div>
        <div class="shelf-label shelf-label-right"><span>{{label}}</span></div>
    </div>
</template>

<script>
import Book from "./Book";

export default {
    name: "Shelf",
    props: {
        shelf: Object,
        label: String
    },
    data() {
        return {
            isOverflowed: false
        }
    },
    components: {
        Book
    },
    mounted() {
        this.isOverflowed = this.checkOverflow();
    },
    methods: {
        checkOverflow() {
            const content = this.$refs.shelfContent;
            return content.scrollWidth > content.clientWidth;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/general";
    $shelf-border-size: 25px;
    $shelf-label-offset: 20px;
    $shelf-border: $shelf-border-size solid $main-bg-color;
    $shelf-offset: 8px;

    .shelf {
        width: calc(100% - #{($shelf-label-offset * 2)});
        min-height: 150px;
        max-height: 150px;
        margin: 160px auto;
        border-left: $shelf-border;
        border-bottom: $shelf-border;
        border-right: $shelf-border;
        border-radius: 5px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
        position: relative;

        &-content {
            display: flex;
            align-items: flex-end;
            width: calc(100% - #{$shelf-label-offset});
            padding: $shelf-offset 0;
            overflow-x: auto;
            overflow-y: hidden;
            position: absolute;
            bottom: 0;
            left: $shelf-label-offset / 2;
            /* SCROLL PROPERTIES */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */

            &::-webkit-scrollbar {
                display: none; /* Chrome & Safari */
            }
            /* END SCROLL PROPERTIES */

            &:after {
                content: "";
                padding: 1px;
            }
        }

        &-label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 10px;
            background-color: $special-color;
            color: $main-text-color;
            font-weight: bold;
            font-size: 22px;
            border-radius: 5px;
            margin: 5px 0 0 0;
            z-index: 1;

            &-left {
                left: -($shelf-border-size + $shelf-label-offset - 2px);
            }

            &-right {
                right: -($shelf-border-size + $shelf-label-offset - 2px);
            }
        }

        &-overflowed {
            $arrows-size: 30px;
            &:before, &:after {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: "Font Awesome 5 Free", sans-serif;
                font-weight: 900;
                top: -$arrows-size / 2;
                transform: translateY(50%);
                width: $arrows-size;
                height: $arrows-size;
                background-color: #ccc;
                color: black;
                border-radius: 50%;
                z-index: 2;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }

            $arrows-offset: -8px;
            &:before {
                left: $arrows-offset;
                padding-right: $arrows-size / 15;
                content: "\f053";
                animation: .8s linear infinite left-arrow;
            }

            &:after {
                right: $arrows-offset;
                padding-left: $arrows-size / 10;
                content: "\f054";
                animation: .8s linear infinite right-arrow;
            }
        }
    }
</style>