<template>
  <div class="wrap">
    <v-form @submit.prevent="createBrand">
      <v-text-field v-model.trim="brand.description" label="Описание" />

      <v-text-field v-model.trim="brand.image" label="Ссылка на изображение" />

      <v-text-field v-model.number="brand.name" label="Название" />

      <v-btn type="submit">Добавить</v-btn>
    </v-form>
  </div>
</template>

<script>
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
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
      brand: {
        description: null,
        image: null,
        name: null,
      },
    };
  },

  computed: {
    brandNames() {
      return this.brands.map((brand) => brand.name);
    },
  },

  methods: {
    isFormValid() {
      let flag = true;

      const keys = Object.keys(this.brand);
      keys.forEach((key) => {
        if (this.brand[key] === null) {
          flag = false;
        }
      });

      return flag;
    },

    async createBrand() {
      if (!this.isFormValid()) return;

      const id = v4();

      await updateDoc(doc(db, "cars", "brands"), {
        brands: arrayUnion({ id, ...this.brand }),
      });

      await updateDoc(doc(db, "cars", "models"), {
        [id]: [],
      });

      await sendAnalyticsRequest("createBrand");
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
