import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import ViewTour from '../views/ViewTour.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create"
    }
  },
  {
    path: "/view-tour/:tourId",
    name: "View-Tour",
    component: ViewTour,
    meta: {
      title: "View Tour"
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title} | AMS Tours`;
  next();
})

// Route guard for auth routes

export default router;
