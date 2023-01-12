<template>
  <div v-if="userStore.user.status === 'admin'" class="admin-links">
    <router-link exact-path to="/users">Все пользователи</router-link>
    <router-link exact-path to="/createBrand">Создание бренда</router-link>
    <router-link exact-path to="/createCar">Создание машины</router-link>
    <router-link exact-path to="/analytics">Аналитика</router-link>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user";

export default {
  name: "admin-links",

  setup: () => ({ userStore: useUserStore() }),
};
</script>

<style lang="scss" scoped>
.admin-links {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  a {
    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
