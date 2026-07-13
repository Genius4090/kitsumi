<script lang="ts" setup>
interface CardType {
  id: number;
  img: string;
  text: string;
  quantity: number;
}

const cardList: CardType[] = [
  {
    id: 1,
    img: "/images/main/card__img1.svg",
    text: "/icons/main/card__icon1.svg",
    quantity: 12,
  },
  {
    id: 2,
    img: "/images/main/card__img2.svg",
    text: "/icons/main/card__icon2.svg",
    quantity: 8,
  },
  {
    id: 3,
    img: "/images/main/card__img3.svg",
    text: "/icons/main/card__icon3.svg",
    quantity: 5,
  },
];
</script>

<template>
  <section class="flex flex-col items-center my-20 px-4">
    <div class="max-w-[500px] flex flex-col items-center gap-2">
        <Headline>our specialties</Headline>
    <p class="text-lg text-center font-light">Secure your spot at Kitsumi, where exceptional sushi and a remarkable dining experience await.</p>
    </div>

    <ul class="flex flex-wrap justify-center gap-10 mt-10">
    <li v-for="item in cardList" :key="item.id" class="flex flex-col gap-5 p-6 border border-textish/80 rounded-tl-[40px] rounded-br-[40px]">
        <NuxtImg :src="item.img" alt="speciality card img" width="242" height="180" class="w-full max-w-[242px] h-auto"/>
        <div class="flex items-end justify-between">
        <NuxtImg :src="item.text" alt="speciality card title img" class="min-w-[80px] min-h-[24px] "/>
         <p class="text-white/90">{{ item.quantity }} varieties</p>
        </div>
        <NuxtLink to="/menu" class="border border-pinkish rounded-tl-[20px] rounded-br-[20px] py-5 px-10 flex items-center justify-center">
            <NuxtImg src="/icons/main/card__order__icon.svg" alt="speciality card order" width="109"/>
         </NuxtLink>
    </li>
  </ul>
  </section>
</template>
