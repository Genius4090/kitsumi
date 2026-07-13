

<script lang="ts" setup>
import { Leaf } from "lucide-vue-next";
import { categories, products } from "~/data/products";

const activeCategory = ref("all");

const filteredProducts = computed(() => {
  const filteredCat = categories.filter((item) => item.slug !== "all");

  const selectedCat =
    activeCategory.value === "all"
      ? filteredCat
      : filteredCat.filter((item) => item.slug === activeCategory.value);

  return selectedCat
    .map((item) => ({
      ...item,
      products: products.filter((product) => product.categoryId === item.id),
    }))
    .filter((cat) => cat.products.length > 0);
});
</script>

<template>
  <section class="flex flex-col py-20 md:py-28 containers min-h-screen">
    <div class="w-full menu-banner h-[260px] sm:h-[340px] md:h-[419px] rounded-xl flex items-end justify-center">
      <div class="flex flex-col items-center mb-5">
        <Headline>Menu</Headline>
        <p class="text-sm md:text-lg text-center font-light max-w-[500px]">
          Secure your spot at Kitsumi, where exceptional sushi and a remarkable
          dining experience await.
        </p>
      </div>
    </div>

    <div class="py-10 pb-20 md:pb-40 px-4 sm:px-8 lg:px-24  border border-borderish rounded-2xl mt-12">
      <div class="flex flex-wrap gap-2 justify-center ">
      <button
        @click="activeCategory = item.slug"
        v-for="item in categories"
        class="uppercase rounded-lg border border-borderish px-2.5 text-sm py-1.5 tracking-widest hover:border-pinkish duration-500"
      >
        {{ item.title }}
      </button>
    </div>
   

    <Transition name="menu-list" mode="out-in">
    <div :key="activeCategory">
    <div
      v-for="item in filteredProducts"
      :key="item.id"
      class="flex flex-col items-center mt-16"
    >
      <Headline>{{ item.title }}</Headline>

      <ul class="flex flex-col gap-8 mt-12">
  <li
    v-for="product in item.products"
    :key="product.id"
    class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
  >
    <NuxtImg :src="product.image" width="150" class="rounded-lg w-[150px] h-auto object-cover" />

    <div class="flex-1 w-full ">
      <!-- Верхняя строка: название · линия · цена -->
      <div class="flex items-end gap-4">
        <span class="flex items-center gap-3 shrink-0">
          <h4 class="font-forum text-lg sm:text-[22px] uppercase tracking-wider">
            {{ product.title }}
          </h4>
          <Leaf v-if="product.isEco" class="w-4 mb-1" />
        </span>

        <!-- соединительная пунктирная линия -->
        <span class="flex-1 border-b border-dashed border-borderish mb-2"></span>

        <p class="shrink-0 font-forum text-lg sm:text-[22px]">${{ product.price }}</p>
      </div>

      <!-- Описание -->
      <p class="mt-2 text-silverish font-light max-w-[560px]">
        {{ product.description }}
      </p>
    </div>
  </li>
</ul>
    </div>
    </div>
    </Transition>
    </div>
  </section>
</template>

<style scoped>
.menu-list-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-list-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-list-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.menu-list-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-list-enter-active,
  .menu-list-leave-active {
    transition: none;
  }
}

.menu-banner {
  background-image: url("/images/menu/menu__poster.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
