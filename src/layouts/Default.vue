<template>
  <div class="defaultLayout">
    <the-header />

    <div class="main">
      <slot></slot>
    </div>

    <the-footer />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";

export default {
  name: "default-layout",

  components: { TheHeader, TheFooter },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 226px);
  height: auto;
}
</style>
