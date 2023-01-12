<template>
  <div class="brand">
    <v-card
      :style="{ paddingTop: '40px' }"
      class="mx-auto"
      min-width="240px"
      width="100%"
    >
      <v-img
        :lazy-src="image"
        :src="brand.image"
        :style="{
          marginBottom: '20px',
        }"
        contain
        height="64px"
      />

      <v-card-title> {{ brand.name }}</v-card-title>

      <v-card-actions>
        <v-btn class="open" color="orange lighten-2" text @click="open">
          МОДЕЛИ
        </v-btn>

        <v-spacer />

        <v-btn icon @click="swapDescription">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />

          <v-card-text>
            {{ description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import image from "@/assets/image.png";
import { useLoadingStore } from "@/store/loading";

export default {
  name: "brand-card",

  setup: () => ({ loadingStore: useLoadingStore() }),

  props: {
    brand: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    show: false,
    image: image,
  }),

  computed: {
    description() {
      return this.brand.description !== "-"
        ? this.brand.description
        : "Описание отсутствует";
    },
  },

  methods: {
    async open() {
      this.loadingStore.start();

      const query = {
        brandId: this.$props.brand.id,
      };

      this.$emit("loadCars", this.$props.brand.id);
      await this.$router.push({ path: "/", query });

      this.loadingStore.end();
    },

    swapDescription() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.brand {
  width: 100%;
  height: 100%;

  .open {
    cursor: pointer;
  }
}
</style>
