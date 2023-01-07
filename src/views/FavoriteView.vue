<template>
  <div class="favourite">
    <span v-if="!favorite.length">Пусто</span>

    <div v-else class="wrap">
      <v-card
        v-for="(car, i) in favorite"
        :key="car.id + i"
        :style="{ marginBottom: '20px' }"
        class="mx-auto"
        min-width="240"
        width="100%"
      >
        <v-img :src="car.image" class="white--text align-end" height="200px">
          <v-card-title>{{ car.model }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ car.generation }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Страна: {{ car.country }}</div>

          <div>Дверей: {{ car.door }}</div>

          <div>Сидений: {{ car.seat }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn v-if="!isItMyCar(car.id)" icon text @click="addCar(car.id)">
            <v-icon size="24px">mdi-plus</v-icon>
          </v-btn>
          <v-btn v-else icon text @click="removeCar(car.id)">
            <v-icon size="24px">mdi-minus</v-icon>
          </v-btn>
          <v-btn icon text @click="removeFavorite(car.id)">
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "favorite-view",

  computed: {
    ...mapGetters({ id: "id", favorite: "favorite/favorite" }),
  },

  created() {
    this.$store.dispatch("favorite/load", this.id);
  },

  methods: {
    isItMyCar(id) {
      const myCars = this.$store.getters["myCars/cars"];
      return myCars.find((car) => car.id === id);
    },

    addCar(generation_id) {
      this.$store.dispatch("myCars/add", {
        user_id: this.id,
        generation_id,
      });
    },

    removeCar(generation_id) {
      this.$store.dispatch("myCars/remove", {
        user_id: this.id,
        generation_id,
      });
    },

    removeFavorite(generation_id) {
      this.$store.dispatch("favorite/remove", {
        user_id: this.id,
        generation_id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.favourite {
  padding: 20px;

  .wrap {
    margin: 0 0 10px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px;
  }

  @media (max-width: 1320px) {
    .wrap {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    }
  }

  @media (max-width: 1024px) {
    .wrap {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
}
</style>
