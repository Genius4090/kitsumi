<script lang="ts" setup>
interface AddressType {
  id: number;
  title: string;
  content?: string;
  socials?: Array<string>
}

const addressList: AddressType[] = [
  {
    id: 1,
    title: "Address",
    content: "123 Sakura Way Tokyo, Japan 100-0001",
  },
  {
    id: 2,
    title: "Phone",
    content: "+49 1234 567890",
  },
  {
    id: 3,
    title: "Email",
    content: "kitsumi@hotmail.com",
  },
  {
    id: 4,
    title: "Follow",
    socials: ["social__icon1.svg", "social__icon2.svg", "social__icon3.svg"],
  },
];
</script>

<template>
  <section class="py-14 pb-20 border border-borderish rounded-2xl flex flex-col items-center px-5 sm:px-8 md:px-12 w-full max-w-[520px]">
    <Headline>Contact</Headline>
    <ul class="w-full mt-10 flex flex-col gap-4">
      <li
        v-for="item in addressList"
        class="flex items-center justify-between gap-4">
        <h4 class="font-forum text-lg sm:text-2xl tracking-wider">{{ item.title }}</h4>
        <p v-if="item.content" class="font-forum text-base sm:text-[22px] text-end max-w-[210px]">{{ item.content }}</p>
      <div class="flex gap-3" v-if="item.socials">
        <span v-for="social in item.socials">
          <NuxtImg :src="`/icons/contact/${social}`" width="28"/>
        </span>
      </div>
      </li>
    </ul>
  </section>
</template>
