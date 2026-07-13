<script lang="ts" setup>
import { Menu } from "lucide-vue-next";

const toggleMenu = useState<boolean>("toggleMenu");

function toggleFn() {
  toggleMenu.value = !toggleMenu.value;
}
</script>

<template>
  <section class="fixed flex items-center p-2 gap-3 md:gap-8 backdrop-blur-md rounded-lg top-4 left-4 md:top-8 md:left-8 z-40 max-w-[calc(100vw-2rem)]">
    <div class="flex items-center gap-3">
      <button class="border border-borderish p-2 rounded-lg" @click="toggleFn">
        <Menu />
      </button>
      <NuxtLink to="/">
        <NuxtImg
          src="/icons/website__logo.svg"
          alt="website__logo"
          width="120"
          class="w-[88px] md:w-[120px] h-auto"
        />
      </NuxtLink>
    </div>
    <NuxtLink
      to="/menu"
      class="hidden md:inline-block font-semibold tracking-wider text-sm"
      >MENU</NuxtLink
    >
    <NuxtLink
      to="/about"
      class="hidden md:inline-block font-semibold tracking-wider text-sm"
      >ABOUT</NuxtLink
    >
    <NuxtLink
      to="/reservation"
      class=" font-semibold bg-[#111211] whitespace-nowrap py-1.5 px-2 text-xs md:py-2 md:px-3 md:text-sm border rounded-lg tracking-wider border-borderish"
      >BOOK A TABLE</NuxtLink
    >
  </section>
</template>
