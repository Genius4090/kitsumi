<script lang="ts" setup>
import AboutUs from '~/components/main/AboutUs.vue';
import Hero from '~/components/main/Hero.vue';
import ReservationCards from '~/components/main/ReservationCards.vue';
import Slider from '~/components/Slider.vue';
import SpecialCards from '~/components/SpecialCards.vue';

</script>

<template>
<div>
<Hero/>
<div class="min-h-screen">
    <ReservationCards/>
    <AboutUs/>
    <Slider class="my-20 md:my-40"/>
    <SpecialCards/>
</div>
</div>
</template>
