<template>
  <div class="users">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Имя</th>
          <th class="text-left">Дата регистрации</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.date">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.regDate }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main";
import { sendAnalyticsRequest } from "@/js/api";

export default {
  name: "users-view",

  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Имя", value: "name" },
        { text: "Дата регистрации", value: "regDate" },
      ],

      users: [],
    };
  },

  created() {
    this.load();
  },

  methods: {
    async load() {
      const users = [];

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      this.users = users;

      sendAnalyticsRequest("loadUsers");
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
