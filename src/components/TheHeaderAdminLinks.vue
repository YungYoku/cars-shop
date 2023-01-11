<template>
  <router-link v-if="userStore.user.status === 'admin'" exact-path to="/users">
    Все пользователи
  </router-link>

  <router-link
    v-if="userStore.user.status === 'admin'"
    exact-path
    to="/createCar"
  >
    Создание машины
  </router-link>

  <router-link
    v-if="userStore.user.status === 'admin'"
    exact-path
    to="/analytics"
  >
    Аналитика
  </router-link>
</template>

<script>
import { useUserStore } from "@/store/user";

export default {
  name: "the-header-admin-links",

  setup: () => ({ userStore: useUserStore() }),
};
</script>

<style lang="scss" scoped></style>
