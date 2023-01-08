<template>
  <div class="car">
    <span v-if="!showing">Пусто</span>

    <v-card v-else class="mx-auto" height="100%" width="100%">
      <v-img
        :lazy-src="image"
        :src="car.image"
        class="white--text align-end"
        height="400px"
      >
        <v-card-title>{{ car.model }}</v-card-title>
      </v-img>

      <v-card-actions>
        <v-btn v-if="!isItMyCar" icon @click="addCar">
          <v-icon size="24px">mdi-plus</v-icon>
        </v-btn>
        <v-btn v-else icon @click="removeCar">
          <v-icon size="24px">mdi-minus</v-icon>
        </v-btn>
        <v-btn v-if="!isItMyFavorite" icon @click="addFavorite">
          <v-icon size="24px">mdi-bookmark</v-icon>
        </v-btn>
        <v-btn v-else icon @click="removeFavorite">
          <v-icon size="24px">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-subtitle class="pb-0" />

      <!--      <v-card-text class="text&#45;&#45;primary">-->
      <!--        <v-img-->
      <!--          :src="car.brand.image || image"-->
      <!--          class="white&#45;&#45;text align-end"-->
      <!--          height="64px"-->
      <!--          width="64px"-->
      <!--        />-->
      <!--        <div>Производитель: {{ car.brand.name }}</div>-->

      <!--        <div>Страна: {{ car.brand.country }}</div>-->
      <!--      </v-card-text>-->

      <div class="generationsWrap">
        <generation-info
          v-for="car in car.generations"
          :key="car.id"
          :car="car"
        />
      </div>

      <v-carousel
        v-if="false && car.others.length"
        v-model="model"
        :height="400"
        :hide-delimiters="true"
        :show-arrows="car.others.length > 1"
      >
        <v-carousel-item v-for="car in car.others" :key="car.id">
          <v-sheet :style="{ margin: '0 10%' }" height="100%" tile width="80%">
            <cars-area-card :car="car" />
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
import CarsAreaCard from "@/components/home/CarsAreaCard.vue";
import GenerationInfo from "@/components/userCars/GenerationInfo.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/main";
import image from "@/assets/image.png";
import { useSavedStore } from "@/store/myCars";
import { useFavoriteStore } from "@/store/favorite";
import { useUserStore } from "@/store/user";

export default {
  name: "car-view",

  components: { CarsAreaCard, GenerationInfo },

  setup: () => ({
    userStore: useUserStore(),
    savedStore: useSavedStore(),
    favoriteStore: useFavoriteStore(),
  }),

  data() {
    return {
      model: 0,
      car: {},
      image: image,
    };
  },

  computed: {
    showing() {
      return this.car;
    },

    isItMyCar() {
      const myCars = this.savedStore.cars;
      return myCars.find((car) => car.id === this.car.id);
    },

    isItMyFavorite() {
      const favorite = this.favoriteStore.favorite;
      return favorite.find((car) => car.id === this.car.id);
    },

    routeModelId() {
      return this.$route.query.modelId;
    },

    routeBrandId() {
      return this.$route.query.brandId;
    },
  },

  watch: {
    currentRouteQueryId() {
      this.load(this.routeBrandId, this.routeModelId);
    },
  },

  created() {
    this.favoriteStore.load(this.userStore.uid).then(() => {
      this.savedStore.load(this.userStore.uid).then(() => {
        this.load(this.routeBrandId, this.routeModelId);
      });
    });
  },

  methods: {
    addCar() {
      this.savedStore.add(this.pickedCar.id);
    },

    removeCar() {
      this.savedStore.remove(this.pickedCar.id);
    },

    addFavorite() {
      this.favoriteStore.add(this.pickedCar.id);
    },

    removeFavorite() {
      this.favoriteStore.remove(this.pickedCar.id);
    },

    async load(brandId, modelId) {
      const docRef = doc(db, "cars", "models");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const brands = docSnap.data();
        const models = brands[brandId];
        this.car = models.find((item) => item.id === modelId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.car {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .generationsWrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
    padding: 0 10%;
  }

  @media screen and (max-width: 1024px) {
    .generationsWrap {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
    .generationsWrap {
      grid-template-columns: 1fr;
    }
  }
}
</style>
