<script lang="ts" setup></script>

<template>
  <section class="flex flex-col py-20 md:py-28 containers min-h-screen">
    <div
      class="w-full reservation-banner h-[260px] sm:h-[340px] md:h-[419px] flex items-end justify-center rounded-xl">
      <div class="flex flex-col items-center mb-5">
        <Headline>Book a table</Headline>
        <p class="text-sm md:text-lg text-center font-light max-w-[500px]">
          Secure your spot at Kitsumi, where exceptional sushi and a remarkable
          dining experience await.
        </p>
      </div>
    </div>
    <div class="mt-10 flex flex-wrap justify-center gap-10 items-start">
      <ReservationForm />
      <Opening />
    </div>
  </section>
</template>

<style scoped>
.reservation-banner {
  background-image: url("/images/reservation/reservation__poster.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
