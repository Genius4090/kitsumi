<script lang="ts" setup>
import Opening from '~/components/Opening.vue';

interface ContactType {
  id: number;
  content: string;
}

const contactList: ContactType[] = [
  {
    id: 1,
    content: "contact__icon1.svg",
  },
  {
    id: 2,
    content: "contact__icon2.svg",
  },
  {
    id: 3,
    content: "contact__icon3.svg",
  },
];
</script>

<template>
  <section class="flex flex-col py-20 md:py-28 containers min-h-screen">
    <div class="w-full reservation-banner h-[260px] sm:h-[340px] md:h-[419px] rounded-xl" />

    <p class="text-sm md:text-xl text-center font-light mx-auto max-w-[500px] mt-7">
      Secure your spot at Kitsumi, where exceptional sushi and a remarkable
      dining experience await.
    </p>

    <div class="w-full flex flex-col items-center mt-10">
      <h4 class="font-forum uppercase text-2xl md:text-3xl">Open with</h4>
      <ul class="flex items-center justify-center w-full gap-6 mt-4">
        <li
          v-for="item in contactList"
          class="bg-blackish  p-4 rounded-2xl border border-borderish cursor-pointer"
        >
          <NuxtImg :src="`/icons/contact/${item.content}`" class="w-9 h-9 md:h-12 md:w-12" />
        </li>
      </ul>
    </div>

    <div class="mt-12 md:mt-20 w-full flex flex-wrap justify-center gap-6 md:gap-8">

      <Opening/>
      <Address/>
    </div>
  </section>
</template>

<style scoped>
.reservation-banner {
  background-image: url("/images/contact/contact__poster.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
