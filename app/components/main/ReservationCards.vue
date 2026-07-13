<script lang="ts" setup>
import { ArrowRight } from "lucide-vue-next";

interface reservationType {
  id: number;
  img: string;
  content: string;
  path: string;
}

const reservationList: reservationType[] = [
  {
    id: 1,
    img: "/images/reservation/reservation__img1.png",
    content: "menu",
    path: "/menu",
  },
  {
    id: 2,
    img: "/images/reservation/reservation__img2.png",
    content: "reservation",
    path: "/reservation",
  },
  {
    id: 3,
    img: "/images/reservation/reservation__img3.png",
    content: "our restaurant",
    path: "/about",
  },
];
</script>

<template>
  <section class="w-full flex justify-center items-center px-5 mt-20">
    <div class="w-full max-w-[1280px] flex flex-col items-center lg:items-end gap-10">
      <Headline class="mr-1 ">reservation</Headline>
    <ul class="w-full flex flex-wrap items-center justify-center gap-5 gap-y-10">
      <li
        v-for="item in reservationList"
        class="w-full max-w-[400px] aspect-[6/5] relative z-10 group"
      >
        <NuxtImg :src="item.img" class="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 duration-300" />

        <div
          class="corner-tab  absolute -bottom-px -right-px bg-blackish pl-8  pt-2"
        >

        <NuxtLink :to="item.path" class="uppercase text-textish text-lg font-forum flex items-center gap-3">
          <p class="uppercase text-textish text-lg font-forum">
            {{ item.content }}
          </p> 
          <span
            class="text-textish font-semibold bg-[#111211] text-sm p-1 px-1.5 border rounded-full tracking-wider border-borderish"
            ><ArrowRight class="w-5"
          />
        </span>
          </NuxtLink>
         
   
        </div>
      </li>
    </ul>
    </div>
  </section>
</template>

<style scoped>
/* radius of the rounded cutouts */
.corner-tab {
  --r: 22px;
  /* convex inner corner (top-left) + match the card's rounded-xl at bottom-right */
  border-top-left-radius: var(--r);

}

/* the two concave (inverted) corner fillets, same tab color #0a0b0a */
.corner-tab::before,
.corner-tab::after {
  content: "";
  position: absolute;
  width: var(--r);
  height: var(--r);
  background: radial-gradient(
    circle at top left,
    transparent var(--r),
    #0a0b0a calc(var(--r) + 0.5px)
  );
}

/* top-right cutout: sits directly above the tab, flush to the right edge.
   1px overlap into the tab hides sub-pixel seams on high-DPR screens. */
.corner-tab::before {
  right: 0;
  bottom: calc(100% - 1px);
}

/* bottom-left cutout: sits directly left of the tab, flush to the bottom edge */
.corner-tab::after {
  bottom: 0;
  right: calc(100% - 1px);
}
</style>
