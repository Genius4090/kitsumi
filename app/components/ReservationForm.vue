<script lang="ts" setup>
const guests = Array.from({ length: 6 }, (_, i) => i + 1);

const nameVal = ref("");
const phoneVal = ref("");
const emailVal = ref("");
const guestsVal = ref(1);
const dateVal = ref(null);
const timeVal = ref(null);

function handleFn(e: SubmitEvent) {
  e.preventDefault();
}
</script>

<template>
  <section class="w-full lg:w-auto">
    <div
      class="py-10 px-5 sm:py-14 sm:px-10 border border-borderish rounded-2xl w-full max-w-[693px] flex flex-col items-center">
      <Headline>Reservation</Headline>
      <p class="text-sm md:text-lg text-center font-light max-w-[500px] mt-4">
        Secure your spot at Kitsumi, where exceptional sushi and a remarkable
        dining experience await.
      </p>
      <form @submit="handleFn" class="flex flex-col gap-6 w-full mt-10">
        <Input v-model="nameVal" placeholder="Name" />
        <Input v-model="phoneVal" type="tel" placeholder="Phone Number" />
        <Input v-model="emailVal" type="email" placeholder="Email" />
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <Select v-model="guestsVal" :guestsCount="guests" class="w-full" />
          <Input
            v-model="dateVal"
            type="date"
            placeholder="date"
            class="w-full"
          />
          <Input
            v-model="timeVal"
            type="time"
            placeholder="time"
            class="w-full"
          />
        </div>

        <button
          class="uppercase text-blackish bg-textish py-4 w-full rounded-lg text-sm tracking-wider"
        >
          reserve
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
  opacity: 0.6;
}
</style>
