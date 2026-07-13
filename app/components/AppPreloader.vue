<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { animate } from "motion-v";

const emit = defineEmits<{ complete: [] }>();

const visible = ref(true);
const displayCount = ref(0);

// One word per quarter of loading progress
const phases = ["Slicing", "Rolling", "Plating", "Itadakimasu"];
const phaseText = computed(
  () =>
    phases[
      Math.min(
        phases.length - 1,
        Math.floor((displayCount.value / 100) * phases.length)
      )
    ]
);

const leftPanel = ref<HTMLElement>();
const rightPanel = ref<HTMLElement>();
const content = ref<HTMLElement>();

const controls: { stop(): void }[] = [];
let assetTimeout: ReturnType<typeof setTimeout> | undefined;
let minTimeout: ReturnType<typeof setTimeout> | undefined;

function loadAssets(): Promise<void> {
  const fonts = document.fonts.ready.then(
    () => {},
    () => {},
  );
  const heroEl = document.querySelector<HTMLImageElement>(
    'img[src*="hero__image"]',
  );
  const hero = heroEl ? heroEl.decode().catch(() => {}) : Promise.resolve();
  const real = Promise.all([fonts, hero]).then(() => {});
  // Never trap the user behind a slow asset
  const safety = new Promise<void>((r) => {
    assetTimeout = setTimeout(r, 3400);
  });
  // Long enough for all four phase words to be readable
  const minDuration = new Promise<void>((r) => {
    minTimeout = setTimeout(r, 2600);
  });
  return Promise.all([Promise.race([real, safety]), minDuration]).then(
    () => {},
  );
}

async function runCounter(assetsReady: Promise<void>) {
  let current = 0;
  const tick = (v: number) => {
    current = v;
    displayCount.value = Math.round(v);
  };
  let ready = false;
  assetsReady.then(() => {
    ready = true;
  });

  // Linear so each 25% phase word gets equal screen time
  const sprint = animate(0, 90, {
    duration: 2.8,
    ease: "linear",
    onUpdate: tick,
  });
  controls.push(sprint);
  await sprint;

  if (!ready) {
    const crawl = animate(90, 99, {
      duration: 2,
      ease: "linear",
      onUpdate: tick,
    });
    controls.push(crawl);
    await assetsReady;
    crawl.stop();
  } else {
    await assetsReady;
  }

  const snap = animate(current, 100, {
    duration: 0.4,
    ease: "easeOut",
    onUpdate: tick,
  });
  controls.push(snap);
  await snap;
}

async function runExit() {
  if (content.value) {
    const fade = animate(
      content.value,
      { opacity: 0, y: -24 },
      { duration: 0.3, ease: "easeIn" },
    );
    controls.push(fade);
    await fade;
  }
  emit("complete");
  if (leftPanel.value && rightPanel.value) {
    const left = animate(
      leftPanel.value,
      { x: "-100%" },
      { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    );
    const right = animate(
      rightPanel.value,
      { x: "100%" },
      { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
    );
    controls.push(left, right);
    await Promise.all([left, right]);
  }
}

async function runReducedPath(assetsReady: Promise<void>) {
  displayCount.value = 100;
  await Promise.race([assetsReady, new Promise((r) => setTimeout(r, 600))]);
  const root = document.querySelector<HTMLElement>(".app-preloader");
  if (root) {
    const fade = animate(
      root,
      { opacity: 0 },
      { duration: 0.3, ease: "linear" },
    );
    controls.push(fade);
    await fade;
  }
  emit("complete");
  finish();
}

function finish() {
  visible.value = false;
  document.documentElement.classList.remove("intro-active");
  document.documentElement.classList.add("intro-played");
}

onMounted(async () => {
  if (introAlreadyPlayed()) {
    visible.value = false;
    emit("complete");
    return;
  }
  try {
    sessionStorage.setItem("kitsumi_intro_played", "1");
  } catch {}
  document.documentElement.classList.add("intro-active");

  const assetsReady = loadAssets();

  if (prefersReducedMotion()) {
    await runReducedPath(assetsReady);
    return;
  }

  await runCounter(assetsReady);
  await runExit();
  finish();
});

onBeforeUnmount(() => {
  controls.forEach((c) => c.stop());
  clearTimeout(assetTimeout);
  clearTimeout(minTimeout);
  document.documentElement.classList.remove("intro-active");
});
</script>

<template>
  <div
    v-if="visible"
    aria-hidden="true"
    class="app-preloader fixed inset-0 z-[100]"
  >
    <div ref="leftPanel" class="absolute inset-y-0 left-0 w-1/2 bg-blackish" />
    <div
      ref="rightPanel"
      class="absolute inset-y-0 right-0 w-1/2 bg-blackish"
    />

    <div ref="content" class="absolute inset-0">
      <div
        class="absolute inset-3 md:inset-4 border border-borderish rounded-2xl pointer-events-none"
      />

      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="relative w-[72vw] max-w-[640px] h-14 md:h-32 border border-borderish rounded-xl overflow-hidden"
        >
          <div
            class="absolute left-0 top-0 h-full bg-pinkish rounded-lg"
            :style="{ width: displayCount + '%' }"
          />
          <span
            class="absolute inset-0 flex items-center justify-center font-forum uppercase tracking-[0.12em] text-textish text-2xl md:text-6xl"
          >
            <Transition name="phase" mode="out-in">
              <span class="italic" :key="phaseText">{{ phaseText }}</span>
            </Transition>
          </span>
        </div>
      </div>

      <span
        class="absolute bottom-8 right-8 md:bottom-10 md:right-12 font-forum italic leading-none text-textish tabular-nums text-4xl md:text-8xl"
      >
        {{ displayCount }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
.phase-enter-active,
.phase-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.phase-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.phase-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
