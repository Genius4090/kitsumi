<script lang="ts" setup>
const openingList: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday&Sunday",
];
</script>

<template>
  <section
    class="py-14 pb-20 border border-borderish rounded-2xl flex flex-col items-center px-5 sm:px-8 md:px-12 w-full max-w-[540px]"
  >
    <Headline>Opening hours</Headline>
    <ul class="w-full mt-10 flex flex-col gap-4">
      <li
        v-for="item in openingList"
        class="flex items-end justify-between gap-4"
      >
        <h4 class="font-forum text-lg sm:text-2xl tracking-wider">
          {{ item }}
        </h4>
        <span
          class="flex-1 border-b border-dashed border-borderish mb-2"
        ></span>
        <p class="shrink-0 font-forum text-base sm:text-[22px]">16:00 - 22:30</p>
      </li>
    </ul>
  </section>
</template>
