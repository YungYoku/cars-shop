<template>
  <div class="footer">
    <v-footer dark padless="true">
      <v-card class="flex" flat tile>
        <v-card-title class="footer_info">
          <strong class="subheading">Присоединись!</strong>

          <v-spacer />

          <v-btn v-for="icon in icons" :key="icon" class="mx-2" dark icon>
            <v-icon :icon="icon" />
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-card-text>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>Автомобили</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
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
.footer {
  width: 100%;
  position: relative;
  z-index: 3;

  .v-footer {
    background-color: #788bff;

    .v-card {
      background: transparent;
    }
  }
}
</style>
