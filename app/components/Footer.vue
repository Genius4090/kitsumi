<script lang="ts" setup>
import { Mail, MapPin, Phone } from "lucide-vue-next";
import type { Component } from "vue";

interface FooterType {
  id: number;
  icon: Component;
  content: string;
  href?: string;
}

interface NavType {
  id: number;
  path: string;
  content: string;
}

const footerList: FooterType[] = [
  {
    id: 1,
    icon: MapPin,
    content: "123 Sakura Way Tokyo, Japan 100-0001",
  },
  {
    id: 2,
    icon: Phone,
    content: "+49 1234 567890",
    href: "tel:+491234567890",
  },
  {
    id: 3,
    icon: Mail,
    content: "kitsumi@hotmail.com",
    href: "mailto:kitsumi@hotmail.com",
  },
];

const navList: NavType[] = [
  { id: 1, path: "/menu", content: "menu" },
  { id: 2, path: "/reservation", content: "reservation" },
  { id: 3, path: "/about", content: "about" },
  { id: 4, path: "/contact", content: "contact" },
];
</script>
<template>
  <footer
    class="relative overflow-hidden min-h-[65svh] bg-blackish flex flex-col justify-end pt-24"
  >
    <div class="opacity-[0.07]">
      <NuxtImg
        src="/images/footer/footer__img2.svg"
        class="absolute right-4 bottom-0 w-[min(450px,60vw)] select-none pointer-events-none"
      />
      <NuxtImg
        src="/images/footer/footer__img1.svg"
        class="absolute bottom-0 w-full select-none pointer-events-none"
      />
    </div>

  
    <div class="mb-10 z-40">
      <h2
      class="select-none text-center font-forum uppercase leading-[0.85] text-[clamp(3.25rem,16vw,15rem)] text-textish/90 transition-colors duration-500 hover:text-pinkish"
    >
      kitsumi
    </h2>

      <ul class="flex flex-col items-center gap-4 mt-8 px-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4 sm:mt-10">
        <li v-for="item in footerList" :key="item.id" class="flex items-center gap-2 tracking-wider">
            <component :is="item.icon" class="text-pinkish w-5"/>
            <p class="font-forum text-base sm:text-lg">{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </footer>
</template>
