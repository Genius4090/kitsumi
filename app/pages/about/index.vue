<script lang="ts" setup>
import AboutUs from "~/components/main/AboutUs.vue";

interface AboutType {
  id: number;
  title: string;
  img: string;
}

const aboutList: AboutType[] = [
  {
    id: 1,
    title: "How Kitsumi Redefines Flavor Harmony in Every Bite",
    img: "/images/about/about__img1.png",
  },
  {
    id: 2,
    title: "Unveiling the Mastery Behind Our Culinary Craftsmanship",
    img: "/images/about/about__img2.png",
  },
  {
    id: 3,
    title: "Journey through Freshness Exquisite Sushi Selection",
    img: "/images/about/about__img3.png",
  },
];
</script>

<template>
  <section class="flex flex-col py-20 md:py-28 containers min-h-screen">
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <li
        v-for="item in aboutList"
        :key="item.id"
        class="w-full max-w-[380px] aspect-[380/578] relative group"
      >
        <NuxtImg
          :src="item.img"
          alt="about-page-image"
          class="w-full h-full object-cover lg:opacity-80 lg:group-hover:opacity-100"
        />
        <h3
          class="absolute left-2 bottom-5 text-xl sm:text-2xl px-2 font-forum uppercase lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 ease-in-out"
        >
          {{ item.title }}
        </h3>
      </li>
    </ul>
    <AboutUs />
    <div class="flex justify-center">
      <Headline>visit us</Headline>
    </div>
    <div
      class="w-full about-banner h-[260px] sm:h-[340px] md:h-[419px] flex items-end justify-center rounded-2xl mt-4"
    />
    <Slider class="my-14 mb-24" />
    <SpecialCards/>
  </section>
</template>

<style scoped>
.about-banner {
  background-image: url("/images/about/about__poster.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
