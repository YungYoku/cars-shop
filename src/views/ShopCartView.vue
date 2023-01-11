<template>
  <div class="userCars">
    <span v-if="!savedStore.cars.length">Пусто</span>

    <div v-else class="wrap">
      <v-card
        v-for="(car, i) in savedStore.cars"
        :key="car.id + i"
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

        <v-card-text class="text--primary">
          <div>Страна: {{ car.country }}</div>

          <div>Дверей: {{ car.door }}</div>

          <div>Сидений: {{ car.seat }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn icon text @click="showPopup(car)">
            <v-icon icon="mdi-minus" size="24px" />
          </v-btn>

          <v-btn
            v-if="!isItMyFavorite(car)"
            icon
            text
            @click="addFavorite(car)"
          >
            <v-icon icon="mdi-bookmark" size="24px" />
          </v-btn>

          <v-btn v-else icon text @click="removeFavorite(car)">
            <v-icon icon="mdi-delete" size="24px" />
          </v-btn>

          <v-btn icon text>
            <v-icon icon="mdi-cart" size="24px" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div class="alertBottom">
      <v-alert
        v-if="alert"
        bottom="20px"
        color="error accent-4"
        colored-border
        elevation="2"
        transition="scale-transition"
      >
        <v-btn class="button" color="error" depressed @click="removeCar">
          Подтвердить
        </v-btn>

        <v-btn class="button" color="success" depressed @click="hidePopup">
          Отменить
        </v-btn>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user";
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";

export default {
  name: "shop-cart-view",

  setup: () => ({
    userStore: useUserStore(),
    savedStore: useSavedStore(),
    favoriteStore: useFavoriteStore(),
  }),

  data() {
    return {
      alert: false,
      brandId: "",
      modelId: "",
    };
  },

  computed: {},

  watch: {
    cars() {
      this.hidePopup();
    },
  },

  methods: {
    isItMyFavorite(propsCar) {
      const favorite = this.userStore.user.favorite;
      return !!favorite.find(
        (car) =>
          car.brandId === propsCar.brandId && car.modelId === propsCar.modelId
      );
    },

    removeCar() {
      this.savedStore.remove(this.brandId, this.modelId);
      this.hidePopup();
    },

    addFavorite(car) {
      this.favoriteStore.add(car.brandId, car.modelId);
    },

    removeFavorite(car) {
      this.favoriteStore.remove(car.brandId, car.modelId);
    },

    showPopup(car) {
      this.alert = true;
      this.brandId = car.brandId;
      this.modelId = car.modelId;
    },

    hidePopup() {
      this.alert = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.userCars {
  padding: 20px;

  .wrap {
    margin: 0 0 10px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px;
  }

  .alertBottom {
    left: calc(50% - 170px);
    position: fixed;
    bottom: 20px;
    z-index: 10;

    .button {
      margin: 0 10px;
    }
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

  @media (max-width: 400px) {
    .alertBottom {
      width: 200px;
      left: calc(50% - 100px);

      .button {
        margin: 10px;
      }
    }
  }
}
</style>
