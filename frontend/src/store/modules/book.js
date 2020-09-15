import Config from "../../config/config";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        shelves: {},
        book: null,
        errors: {},
        isUpdated: false
    },
    mutations: {
        SET_SHELVES(state, unsortedBooks) {
            state.shelves = {};
            if (unsortedBooks.length) {
                let currentLabel = unsortedBooks[0].title.substr(0, 1);
                state.shelves[currentLabel] = [];
                for (let book of unsortedBooks) {
                    let tempLabel = book.title.substr(0, 1);

                    if (currentLabel !== tempLabel) {
                        currentLabel = tempLabel;
                        state.shelves[currentLabel] = [];
                    }

                    state.shelves[currentLabel].push(book);
                }
            } else {
                state.shelves = unsortedBooks;
            }
        },
        SET_BOOK(state, response) {
            if (response.status === 404) {
                router.push('/');
            } else {
                state.book = response;
            }
        },
        CHECK_ADDING_ERRORS(state, response) {
            state.errors = {};
            if (Array.isArray(response) && response.length) {
                for (let error of response) {
                    state.errors[error.field] = error.message;
                }
            } else {
                router.push('/');
            }
        },
        CHECK_UPDATE_ERRORS(state, response) {
            state.errors = {};
            if (Array.isArray(response) && response.length) {
                for (let error of response) {
                    state.errors[error.field] = error.message;
                }
            } else {
                state.isUpdated = true;
            }
        },
        COMMIT_DELETE(state, isDeleted) {
            if (isDeleted) {
                let shelf = state.shelves[state.book.title.charAt(0)];
                shelf.splice(shelf.indexOf(state.book), 1);

                if (!shelf.length) {
                    delete state.shelves[state.book.title.charAt(0)];
                }

                router.push('/');
            }
        },
        CLEAR_ERRORS(state) {
            state.errors = {};
        }
    },
    actions: {
        async fetchAllOrderedBooks({ commit, rootGetters }) {
            const response = rootGetters['auth/isAuthenticated']
                ? await fetch(Config.restDomainUrl + '/books?per-page=50', {
                    method: 'GET',
                    headers: Config.getHeaders()
                })
                : await fetch(Config.restDomainUrl + '/book/default', {
                    method: 'GET'
                });

            commit('SET_SHELVES', response.status === 200 ? await response.json() : []);
        },
        async fetchBookById({ commit }, bookId) {
            const response = await fetch(Config.restDomainUrl + `/books/${bookId}`, {
                method: 'GET',
                headers: Config.getHeaders()
            });

            commit('SET_BOOK', await response.json());
        },
        async addNewBook({ commit }, newBook) {
            const response = await fetch(Config.restDomainUrl + '/books', {
                method: 'POST',
                headers: Config.getHeaders({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(newBook)
            });

            commit('CHECK_ADDING_ERRORS', await response.json());
        },
        async updateBookInfo({ commit }, bookInfo) {
            const response = await fetch(Config.restDomainUrl + '/books/' + bookInfo.id, {
                method: 'PUT',
                headers: Config.getHeaders({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(bookInfo)
            });

            commit('CHECK_UPDATE_ERRORS', await response.json());
        },
        async deleteBook({ commit }, bookId) {
            const response = await fetch(Config.restDomainUrl + '/books/' + bookId, {
                method: 'DELETE',
                headers: Config.getHeaders({})
            });

            commit('COMMIT_DELETE', response.status === 204);
        },
        clearErrors({commit}) {
            commit('CLEAR_ERRORS');
        }
    },
    getters: {
        getShelves(state) {
            return state.shelves;
        },
        getCurrentBook(state) {
            return state.book;
        },
        getErrors(state) {
            return state.errors;
        },
        getIsUpdated(state) {
            return state.isUpdated;
        }
    }
}