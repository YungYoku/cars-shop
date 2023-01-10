<template>
  <div class="brands">
    <h4>Бренды</h4>

    <span v-if="!pages.length">Пусто</span>

    <div v-if="pages.length" class="wrap">
      <brands-area-card
        v-for="brand in pages[page - 1]"
        :key="brand.id"
        :brand="brand"
      />
    </div>

    <v-pagination
      v-if="pages.length > 1"
      v-model="page"
      :length="pages.length"
      :total-visible="5"
      circle
    />
  </div>
</template>

<script>
import BrandsAreaCard from "@/components/home/BrandsAreaCard.vue";
import { useFiltersStore } from "@/store/filters";

export default {
  name: "brands-area",

  components: { BrandsAreaCard },

  setup: () => ({ filtersStore: useFiltersStore() }),

  data() {
    return {
      model: 0,
      page: 1,
    };
  },

  computed: {
    pages() {
      const _pages = [];
      let _page = [];
      let brands = this.filtersStore.brands;
      brands.forEach((brand) => {
        if (_page.length < 9) {
          _page.push(brand);
        } else {
          _pages.push(_page);
          _page = [];
        }
      });
      if (brands.length < 9 && !_pages.length && _page.length) {
        _pages.push(_page);
        _page = [];
      }

      return _pages;
    },
  },
};
</script>

<style lang="scss" scoped>
.brands {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0 20px 40px 20px;

  h4 {
    height: 40px;
  }

  .wrap {
    width: 100%;
    height: calc(100% - 40px);
    display: grid;
    grid-template: repeat(3, auto) / repeat(3, 1fr);
    grid-gap: 10px;
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    padding: 0 20px 50px 20px;

    .wrap {
      grid-template: repeat(5, auto) / repeat(2, 1fr);
      margin-bottom: 10px;
    }
  }

  @media (max-width: 768px) {
    .wrap {
      grid-template: repeat(9, auto) / 1fr;
    }
  }

  @media (max-width: 768px) {
    padding: 0 0 50px 0;
  }
}
</style>
