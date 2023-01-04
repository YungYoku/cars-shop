<template>
  <div class="car">
    <span v-if="!showing">Пусто</span>

    <v-card v-else class="mx-auto" height="100%" width="100%">
      <v-img
        :lazy-src="require('../assets/image.png')"
        :src="
          pickedCar.image ? pickedCar.image : require('../assets/image.png')
        "
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

      <v-card-text class="text--primary">
        <v-img
          :src="
            car.brand.image !== '-'
              ? car.brand.image
              : require('../assets/image.png')
          "
          class="white--text align-end"
          height="64px"
          width="64px"
        />
        <div>Производитель: {{ car.brand.name }}</div>

        <div>Страна: {{ car.brand.country }}</div>
      </v-card-text>

      <div class="generationsWrap">
        <generation-info
          v-for="car in car.generations"
          :key="car.id"
          :car="car"
        />
      </div>

      <v-carousel
        v-if="car.others.length"
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
import { mapGetters } from "vuex";
import CarsAreaCard from "@/components/home/CarsAreaCard.vue";
import GenerationInfo from "@/components/userCars/GenerationInfo.vue";
import { getData } from "@/js/api.js";

export default {
  name: "car-view",

  components: { CarsAreaCard, GenerationInfo },

  data() {
    return {
      model: 0,
      car: {},
    };
  },

  computed: {
    ...mapGetters({ id: "id" }),

    showing() {
      return (
        this.car &&
        this.car.generations &&
        this.car.generations[0] &&
        this.pickedCar
      );
    },

    pickedCar() {
      const carGenerations = this.car.generations;
      return carGenerations.find((el) => el.id === this.currentRouteQueryId);
    },

    isItMyCar() {
      const myCars = this.$store.getters["myCars/cars"];
      return myCars.find((car) => car.id === this.pickedCar.id);
    },

    isItMyFavorite() {
      const favorite = this.$store.getters["favorite/favorite"];
      return favorite.find((car) => car.id === this.pickedCar.id);
    },

    currentRouteQueryId() {
      return this.$route.query.id;
    },
  },

  watch: {
    currentRouteQueryId() {
      this.load(this.currentRouteQueryId);
    },
  },

  created() {
    this.$store.dispatch("favorite/load", this.id).then(() => {
      this.$store.dispatch("myCars/load", this.id).then(() => {
        this.load(this.currentRouteQueryId);
      });
    });
  },

  methods: {
    addCar() {
      this.$store.dispatch("myCars/add", {
        user_id: this.id,
        generation_id: this.pickedCar.id,
      });
    },

    removeCar() {
      this.$store.dispatch("myCars/remove", {
        user_id: this.id,
        generation_id: this.pickedCar.id,
      });
    },

    addFavorite() {
      this.$store.dispatch("favorite/add", {
        user_id: this.id,
        generation_id: this.pickedCar.id,
      });
    },

    removeFavorite() {
      this.$store.dispatch("favorite/remove", {
        user_id: this.id,
        generation_id: this.pickedCar.id,
      });
    },

    load(id) {
      getData(`car/about-model?model=${id}`, {}, true).then((car) => {
        this.car = car;
      });
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
