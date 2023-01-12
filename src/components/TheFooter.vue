<template>
  <v-footer class="text-center d-flex flex-column">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      />
    </div>

    <div class="pt-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>

    <v-divider />

    <div>{{ new Date().getFullYear() }} — <strong>Автомобили</strong></div>
  </v-footer>
</template>

<script>
export default {
  name: "the-footer",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  position: relative;
  z-index: 3;
  background-color: #363b57;
  color: #ffffff;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .v-icon {
    color: #000000;
  }
}
</style>
