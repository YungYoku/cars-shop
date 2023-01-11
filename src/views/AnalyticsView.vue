<template>
  <div class="analytics">
    <label for="requestType">
      <span> Тип запроса: </span>
      <select id="requestType" v-model="selectedType">
        <option v-for="request in requestTypes" :key="request" :value="request">
          {{ generateOptionText(request) }}
        </option>
      </select>
    </label>

    <ul v-if="selectedAnalytics.length">
      <li v-for="request in selectedAnalytics" :key="request.date">
        IP запроса: {{ request.ip }}
        <br />
        Дата запроса: {{ new Date(request.date.seconds) }}
      </li>
    </ul>

    <span v-else-if="!selectedType.length">Выберите тип запроса</span>

    <span v-else>Запросы такого типа отсутствуют</span>
  </div>
</template>

<script>
import { getAnalytics } from "@/js/api";

export default {
  data() {
    return {
      analytics: [],
      selectedType: "",
      requestTypes: [
        "login",
        "register",
        "addEmptyUserToDb",
        "loadBrands",
        "loadCars",
        "loadUsers",
        "createCar",
        "addFavorite",
        "removeFavorite",
        "addSaved",
        "removeSaved",
      ],
    };
  },

  computed: {
    selectedAnalytics() {
      if (this.selectedType) {
        return this.analytics.filter((item) => item.type === this.selectedType);
      }
      return [];
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    requestTypes() {
      return requestTypes;
    },
    async load() {
      this.analytics = await getAnalytics();
    },

    findRequestsAmount(type) {
      const requestAnalytics = this.analytics.filter(
        (item) => item.type === type
      );
      return requestAnalytics.length;
    },

    generateOptionText(request) {
      let requestText;
      const requestsAmount = this.findRequestsAmount(request);
      if (
        requestsAmount % 10 === 0 ||
        (requestsAmount % 10 >= 5 && requestsAmount % 10 <= 9)
      ) {
        requestText = "запросов";
      } else if (requestsAmount % 10 === 1) {
        requestText = "запрос";
      } else {
        requestText = "запроса";
      }
      return `${request} (${requestsAmount} ${requestText})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.analytics {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  gap: 10px;
  padding: 20px;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    span {
      width: 104px;
    }

    select {
      width: 100%;
      height: 40px;
      padding: 5px;
      border: 1px solid #000000;
      border-radius: 5px;

      option {
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #000000;
      }
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    overflow: auto;

    li {
      padding: 20px;
      list-style: none;
      border: 1px solid #000000;
      border-radius: 5px;
    }
  }
}
</style>
