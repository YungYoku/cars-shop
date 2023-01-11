import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/main";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorite: [],
  }),

  getters: {},

  actions: {
    async update() {
      const userStore = useUserStore();
      const carIds = userStore.user.favorite;

      const favorite = [];

      const docSnap = await getDoc(doc(db, "cars", "models"));
      if (docSnap.exists()) {
        const brands = docSnap.data();

        carIds.forEach((item) => {
          const brand = brands[item.brandId];
          const car = brand.find((car) => car.id === item.modelId);

          car.brandId = item.brandId;
          car.modelId = item.modelId;

          favorite.push(car);
        });
      }

      this.favorite = favorite;
    },

    async add(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      const car = {
        brandId,
        modelId,
      };

      await updateDoc(doc(db, "users", uid), {
        favorite: arrayUnion(car),
      });
    },

    async remove(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      await updateDoc(doc(db, "users", uid), {
        favorite: arrayRemove({
          brandId,
          modelId,
        }),
      });
    },
  },
});
