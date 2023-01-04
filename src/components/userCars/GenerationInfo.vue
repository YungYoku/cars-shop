<template>
  <div class="generationInfo">
    <v-card class="mx-auto" width="260px">
      <v-img
        :lazy-src="require('../../assets/image.png')"
        :src="car.image !== '-' ? car.image : require('../../assets/image.png')"
        contain
        height="200px"
        width="260px"
      />

      <v-card-title> {{ car.model }}</v-card-title>
      <v-card-subtitle> {{ car.generation }}</v-card-subtitle>
      <v-card-text> Высота: {{ car.height }}</v-card-text>
      <v-card-text> Длина: {{ car.width }}</v-card-text>
      <v-card-text>
        Объем двигателя: {{ car.modification[0].volume }}
      </v-card-text>
      <v-card-text>
        Тип трансмиссии: {{ car.modification[0].transmission }}
      </v-card-text>
      <v-card-text>
        Тип двигателя: {{ car.modification[0].engine }}
      </v-card-text>
      <v-card-text> Корпус: {{ car.modification[0].body }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "generation-info",

  props: {
    car: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.generationInfo {
  width: 260px;

  img {
    width: 200px;
    height: 150px;
  }

  > div {
    margin-bottom: 10px;
  }
}
</style>
