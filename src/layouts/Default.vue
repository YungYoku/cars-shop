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
.defaultLayout {
  min-height: 100vh;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .main {
    height: 100%;
    padding: 80px 10px 10px 10px;
  }
}
</style>
