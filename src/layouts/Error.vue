<template>
  <div>
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
.main {
  height: 100vh;
  max-height: 100vh;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
