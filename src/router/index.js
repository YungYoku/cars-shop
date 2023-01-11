import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";

const isAdmin = () => {
  const userStore = useUserStore();
  if (userStore.user.status === "admin") {
    return true;
  }
  return false;
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
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
    component: () => import("@/views/CarView.vue"),
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
    component: () => import("@/views/LoginView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Логин",
    },
  },

  {
    path: "/reg",
    name: "Registration",
    component: () => import("@/views/RegistrationView.vue"),
    meta: {
      auth: false,
      layout: "default",
      title: "Регистрация",
    },
  },

  {
    path: "/userCars",
    name: "UserCars",
    component: () => import("@/views/UserCarsView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Мои Машины",
    },
  },

  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("@/views/FavoriteView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Избранное",
    },
  },

  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/UsersView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Пользователи",
    },
  },

  {
    path: "/createCar",
    name: "CreateCar",
    component: () => import("@/views/CreateCarView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Создание машины",
    },
    beforeEnter: () => {
      if (isAdmin()) return true;
      return "/";
    },
  },

  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/views/AnalyticsView.vue"),
    meta: {
      auth: true,
      layout: "default",
      title: "Аналитика",
    },
    beforeEnter: () => {
      if (isAdmin()) return true;
      return "/";
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.uid;

  if (to.meta.auth) {
    if (isLoggedIn) {
      return true;
    }

    return "/login";
  }

  if (!to.meta.auth) {
    if (isLoggedIn) {
      return "/";
    }

    return true;
  }
});

export default router;
