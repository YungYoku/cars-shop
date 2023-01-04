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
  min-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
}
</style>
