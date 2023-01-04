import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Главная",
    },
    query: {
      brandName: "",
      brandId: "",
    },
  },

  {
    path: "/car",
    name: "Car",
    component: () => import("../views/CarView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Машина",
    },
    query: {
      id: "",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Логин",
    },
  },

  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/RegistrationView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Регистрация",
    },
  },

  {
    path: "/userCars",
    name: "UserCars",
    component: () => import("../views/UserCarsView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Мои Машины",
    },
  },

  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/FavoriteView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Избранное",
    },
  },

  {
    path: "/users",
    name: "Users",
    component: () => import("../views/UsersView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Пользователи",
    },
  },

  {
    path: "*",
    name: "Page404",
    component: () => import("../views/Page404View.vue"),
    meta: {
      auth: false,
      layout: "error",
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const cleanStorage = () => {
  localStorage.clear();
};

router.beforeEach((to, from, next) => {
  const logged = !!localStorage.access_token && !!localStorage.id;
  console.log("e");
  if (to.name === "Page404") {
    next();
  } else if (!to.meta.auth) {
    if (logged) {
      next("/");
    } else {
      cleanStorage();
      next();
    }
  } else {
    if (logged) {
      next();
    } else {
      cleanStorage();
      next("/login");
    }
  }
});

export default router;
