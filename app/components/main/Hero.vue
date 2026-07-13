<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { animate } from "motion-v";
import LineIcon from "./LineIcon.vue";

const imgEl = ref<HTMLElement | { $el: HTMLElement }>();
const h1El = ref<HTMLElement>();
const linkEl = ref<HTMLElement>();
const smokeEl = ref<HTMLCanvasElement>();

const unrefEl = (r: unknown): HTMLElement | null => {
  if (r instanceof HTMLElement) return r;
  if (r && typeof r === "object" && "$el" in r) return (r as any).$el;
  return null;
};

let smoke: SmokeHandle | null = null;

function startSmoke() {
  const img = unrefEl(imgEl.value);
  if (smoke || !smokeEl.value || !img) return;
  smoke = createSushiSmoke(smokeEl.value, img);
  smoke.start();
}

onMounted(() => {
  const introDone = useIntroDone();
  // "intro-active" on <html> means the preloader is playing right now.
  // (Can't use introAlreadyPlayed() here — AppPreloader mounts first and
  // has already set the session flag by this point.)
  const introActive =
    document.documentElement.classList.contains("intro-active");
  const reduced = prefersReducedMotion();

  if (introDone.value || !introActive || reduced) {
    if (!reduced) startSmoke();
    return;
  }

  // The nigiri image is positioned via Tailwind transform classes, so it
  // only fades; the headline and link also slide/scale in.
  const img = unrefEl(imgEl.value);
  const sliding = [h1El.value, linkEl.value].filter(
    (el): el is HTMLElement => !!el
  );

  // Hidden only on the client, under the opaque preloader — SSR HTML
  // keeps the hero visible so skip visits never see a blank hero.
  if (img) img.style.opacity = "0";
  sliding.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px) scale(0.985)";
  });

  const stop = watch(
    introDone,
    (done) => {
      if (!done) return;
      stop();
      const anims: ReturnType<typeof animate>[] = [];
      if (img) {
        anims.push(
          animate(img, { opacity: 1 }, { duration: 0.9, delay: 0.1, ease: "easeOut" })
        );
      }
      sliding.forEach((el, i) =>
        anims.push(
          animate(
            el,
            { opacity: 1, y: 0, scale: 1 },
            { duration: 0.8, delay: 0.22 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
          )
        )
      );
      Promise.all(anims).then(startSmoke);
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  smoke?.stop();
  smoke = null;
});
</script>

<template>
  <section class="relative w-full h-svh overflow-hidden pointer-events-none">
    <NuxtImg
      src="/images/main/hero__bg.png"
      alt=""
      class="absolute bottom-0 inset-x-0 w-full h-[55%] object-cover object-top lg:object-fill pointer-events-none select-none"
    />

    <div
      class="relative h-full flex flex-col items-center justify-center pt-10 xl:pt-60  pointer-events-none"
    >
      <div class="relative w-full flex items-center justify-center gap-[2vw]">
        <NuxtImg
          ref="imgEl"
          src="/images/main/hero__image.webp"
          alt="Salmon nigiri held by chopsticks"
          class="absolute bottom-full translate-y-[18%] left-1/2 -translate-x-[34%] w-[min(110vw,1200px)] lg:w-[min(110vw,1400px)]"
        />
        <h1
          ref="h1El"
          class="font-forum mt-4 md:mt-0 text-[clamp(3rem,13vw,12rem)] sm:text-[clamp(2.5rem,10vw,12rem)] leading-none uppercase text-center"
        >
          Taste of japan
        </h1>
      </div>

      <span
        ref="linkEl"
        class="pointer-events-auto relative mt-[clamp(1.5rem,6vw,4rem)] flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)] font-forum text-[clamp(1.125rem,1.5vw,1.75rem)] tracking-[0.25em] uppercase"
      >
        <LineIcon class="w-[clamp(3rem,5vw,6rem)]" />
        <NuxtLink to="/menu">Menu</NuxtLink>

        <LineIcon class="w-[clamp(3rem,5vw,6rem)] -scale-x-100" />
      </span>
    </div>

    <canvas
      ref="smokeEl"
      aria-hidden="true"
      class="absolute inset-0 h-full w-full pointer-events-none"
    />
  </section>
</template>
