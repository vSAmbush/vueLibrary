import { createRouter, createWebHistory } from 'vue-router';
import AddBook from "../views/AddBook";
import DefaultLayout from "../views/layouts/DefaultLayout";
import Library from "../views/Library";
import BookInfo from "../views/BookInfo";
import AuthLayout from "../views/layouts/AuthLayout";
import Login from "../views/Login";
import Register from "../views/Register";
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Default',
    component: DefaultLayout,
    /*beforeEnter: (to, from, next) => {
      if (!store.getters['auth/isAuthenticated'] && to.name !== 'Library') {
        next({name: 'Login'});
      } else {
        next();
      }
    },*/
    children: [
      {
        path: '',
        name: 'Library',
        component: Library
      },
      {
        path: 'add-book',
        name: 'AddBook',
        component: AddBook
      },
      {
        path: 'book/:id',
        name: 'BookInfo',
        component: BookInfo
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    /*beforeEnter: (to, from, next) => {
        if (store.getters['auth/isAuthenticated']) {
          next({name: 'Library'});
        } else {
          next();
        }
    },*/
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
    const unauthorizedPermitted = ['Login', 'Register', 'Library'];
    const authorizedProhibited = ['Login', 'Register'];

    if (!store.getters['auth/isAuthenticated'] && !unauthorizedPermitted.includes(to.name)) {
        next({name: 'Login'});
    }

    if (store.getters['auth/isAuthenticated'] && authorizedProhibited.includes(to.name)) {
        next({name: 'Library'});
    } else {
        next();
    }
});

export default router
