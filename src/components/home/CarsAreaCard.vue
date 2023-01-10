<template>
  <div class="car">
    <v-card class="mx-auto" max-width="260px">
      <v-img :lazy-src="image" :src="car.image" contain height="200px" />

      <v-card-title> {{ car.model }}</v-card-title>
      <v-card-subtitle> {{ car.generation }}</v-card-subtitle>

      <v-card-actions>
        <v-btn class="open" color="orange lighten-2" text @click="loadCar">
          Подробнее
        </v-btn>

        <v-spacer />

        <v-btn icon @click="swapDescription">
          <v-icon v-if="show" icon="mdi-chevron-up" />
          <v-icon v-else icon="mdi-chevron-down" />
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />

          <v-card-text v-if="car.generation">
            Поколение: {{ car.generation }}
          </v-card-text>

          <v-card-text v-if="car.volume">
            Объем двигателя: {{ car.volume }}
          </v-card-text>

          <v-card-text v-if="car.transmission">
            Тип трансмиссии: {{ car.transmission }}
          </v-card-text>

          <v-card-text v-if="car.engine">
            Тип двигателя: {{ car.engine }}
          </v-card-text>

          <v-card-text v-if="car.body"> Корпус: {{ car.body }}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import image from "@/assets/image.png";

export default {
  name: "car-card",

  props: {
    car: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    show: false,
    image: image,
  }),

  methods: {
    loadCar() {
      const brandId = this.$route.query.brandId;
      const query = {
        brandId,
        modelId: this.$props.car.id,
      };
      this.$router.push({ path: "/car", query });
    },

    swapDescription() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.car {
  width: 100%;
  height: 100%;
}
</style>
