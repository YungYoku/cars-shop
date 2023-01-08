import { defineStore } from "pinia";
import { useUserStore } from "@/store/user";
import { db } from "@/main";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const useSavedStore = defineStore("saved", {
  state: () => ({
    cars: [],
  }),

  getters: {},

  actions: {
    async update() {
      const userStore = useUserStore();
      const carIds = userStore.user.saved;

      const cars = [];

      const docSnap = await getDoc(doc(db, "cars", "models"));
      if (docSnap.exists()) {
        const brands = docSnap.data();

        carIds.forEach((item) => {
          const car = brands[item.brandId][item.modelId];
          car.brandId = item.brandId;
          car.modelId = item.modelId;

          cars.push(car);
        });
      }

      this.cars = cars;
    },

    async add(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      const car = {
        brandId,
        modelId,
      };

      await updateDoc(doc(db, "users", uid), {
        saved: arrayUnion(car),
      });

      this.cars.push(car);
    },

    async remove(brandId, modelId) {
      const userStore = useUserStore();
      const uid = userStore.uid;

      await updateDoc(doc(db, "users", uid), {
        saved: arrayRemove({
          brandId,
          modelId,
        }),
      });

      this.cars = this.cars.filter((car) => car.modelId !== modelId);

      await userStore.loadUser();
    },
  },
});
