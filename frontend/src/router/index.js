import { createRouter, createWebHistory } from 'vue-router';
import AddBook from "../views/AddBook";
import DefaultLayout from "../views/layouts/DefaultLayout";
import Library from "../views/Library";

const routes = [
  {
    path: '/',
    name: 'Library',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: Library
      },
      {
        path: '/add-book',
        name: 'AddBook',
        component: AddBook
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
