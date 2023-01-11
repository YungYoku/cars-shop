<template>
  <div class="wrap">
    <v-form @submit.prevent="log">
      <v-select
        v-model="car.body"
        :items="bodys"
        label="Корпус"
        persistent-hint
        return-object
      />

      <v-select
        v-model="car.engine"
        :items="engines"
        label="Двигатель"
        persistent-hint
        return-object
      />

      <v-text-field
        v-model.number="car.generation"
        :counter="4"
        label="Год выпуска"
      />

      <v-text-field v-model.trim="car.image" label="Ссылка на изображение" />

      <v-text-field v-model.trim="car.model" label="Название" />

      <v-select
        v-model="car.transmission"
        :items="transmissions"
        label="Трансмиссия"
        persistent-hint
        return-object
      />

      <v-select
        v-model="car.volume"
        :items="volumes"
        label="Объем двигателя"
        persistent-hint
        return-object
      />

      <v-btn type="submit">Добавить</v-btn>
    </v-form>
  </div>
</template>

<script>
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { bodys, engines, transmissions, volumes } from "@/js/filtersData";

export default {
  name: "create-car-view",

  data() {
    return {
      bodys,
      engines,
      transmissions,
      volumes,

      car: {
        body: "",
        engine: "",
        generation: 0,
        image: "",
        model: "",
        transmission: "",
        volume: 1,
      },
    };
  },

  methods: {
    log() {
      console.log(this.car);
    },

    async createCar() {
      await updateDoc(doc(db, "cars", "models"), {
        1: arrayUnion({ id: 0, ...this.car }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  form {
    min-width: 25%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 10px 20px;

    .v-input {
      width: 100%;
    }

    button {
      width: 100%;
      min-height: 44px;
    }
  }
}
</style>
