<template>
  <div class="errorLayout">
    <the-header />

    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  name: "error-layout",

  components: { TheHeader },
};
</script>

<style lang="scss" scoped>
.errorLayout {
  min-height: 100vh;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .main {
    height: 100%;
    padding: 80px 10px 10px 10px;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>
