<template>
  <div class="wrap">
    <v-form @submit.prevent="createCar">
      <v-select
        v-model="car.brand"
        :items="brandNames"
        label="Бренд"
        persistent-hint
        return-object
      />

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

      <v-text-field v-model.number="car.price" label="Цена" />

      <v-btn type="submit">Добавить</v-btn>
    </v-form>
  </div>
</template>

<script>
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { bodys, engines, transmissions, volumes } from "@/js/filtersData";
import { sendAnalyticsRequest } from "@/js/api";

function v4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default {
  name: "create-car-view",

  data() {
    return {
      bodys,
      engines,
      transmissions,
      volumes,

      brands: [],

      car: {
        brand: null,
        body: null,
        engine: null,
        generation: null,
        image: null,
        model: null,
        transmission: null,
        volume: null,
        price: null,
      },
    };
  },

  mounted() {
    this.loadBrands();
  },

  computed: {
    brandNames() {
      return this.brands.map((brand) => brand.name);
    },
  },

  methods: {
    isFormValid() {
      let flag = true;

      const keys = Object.keys(this.car);
      keys.forEach((key) => {
        if (this.car[key] === null) {
          flag = false;
        }
      });

      return flag;
    },

    async createCar() {
      if (!this.isFormValid()) return;

      const brandId = this.getBrandId(this.car.brand);
      await updateDoc(doc(db, "cars", "models"), {
        [brandId]: arrayUnion({ id: v4(), ...this.car }),
      });

      sendAnalyticsRequest("createCar");
    },

    getBrandId(brandName) {
      const brand = this.brands.find((brand) => brand.name === brandName);

      return brand.id;
    },

    async loadBrands() {
      const docSnap = await getDoc(doc(db, "cars", "brands"));
      if (docSnap.exists()) {
        this.brands = docSnap.data().brands;
      }
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
    min-width: 300px;
    width: 30%;
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
