<template>
  <div class="favourite">
    <span v-if="!favoriteStore.favorite.length">Пусто</span>

    <div v-else class="wrap">
      <v-card
        v-for="car in favoriteStore.favorite"
        :key="car.brandId + '' + car.modelId"
        :style="{ marginBottom: '20px' }"
        class="mx-auto"
        min-width="240"
        width="100%"
      >
        <v-img :src="car.image" class="white--text align-end" height="200px" />

        <v-card-title>{{ car.model }}</v-card-title>

        <v-card-subtitle class="pb-0">
          {{ car.generation }}
        </v-card-subtitle>

        <v-card-subtitle> {{ car.price }} ₽</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Страна: {{ car.country }}</div>

          <div>Дверей: {{ car.door }}</div>

          <div>Сидений: {{ car.seat }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="isItMyCar(car)"
            icon="mdi-cart-off"
            text
            @click="removeCar(car)"
          />
          <v-btn v-else icon="mdi-cart" text @click="addCar(car)" />

          <v-btn icon="mdi-star-off" text @click="removeFavorite(car)" />
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";
import { useUserStore } from "@/store/user";

export default {
  name: "favorite-view",

  setup: () => ({
    userStore: useUserStore(),
    savedStore: useSavedStore(),
    favoriteStore: useFavoriteStore(),
  }),

  methods: {
    isItMyCar(propsCar) {
      const saved = this.userStore.user.saved;
      return !!saved.find(
        (car) =>
          car.brandId === propsCar.brandId && car.modelId === propsCar.modelId
      );
    },

    addCar(car) {
      this.savedStore.add(car.brandId, car.modelId);
    },

    removeCar(car) {
      this.savedStore.remove(car.brandId, car.modelId);
    },

    removeFavorite(car) {
      this.favoriteStore.remove(car.brandId, car.modelId);
    },
  },
};
</script>

<style lang="scss" scoped>
.favourite {
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }

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
