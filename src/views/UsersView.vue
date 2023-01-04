<template>
  <div class="users">
    <v-data-table
      :disable-sort="true"
      :headers="headers"
      :items="users"
      :style="{ width: '100%' }"
      class="elevation-1"
      item-key="id"
    />
  </div>
</template>

<script>
import { getData } from "@/js/api.js";

export default {
  name: "users-view",

  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Имя", value: "name" },
        { text: "Email", value: "email" },
        { text: "Дата регистрации", value: "date" },
      ],

      users: [],
    };
  },

  created() {
    this.load();
  },

  methods: {
    load() {
      getData("user", {}, true).then((users) => {
        this.users = users;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  padding: 20px;

  .avatar {
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
