<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const text = "[icon] 最高の食べ物 [icon] 職人の技 [icon] 伝統の味わい [icon]"

// Characters that should render in the accent (red) colour.
const accentChars = ["食",'技','伝']

// Pull the phrases out of `text` (dropping the [icon] tokens). Each phrase is
// rendered as "icon + phrase" so the sequence tiles seamlessly when repeated.
const phrases = text
  .split("[icon]")
  .map((p) => p.trim())
  .filter(Boolean)

// Repeat the phrases so a single group is comfortably wider than any viewport,
// which keeps the two-copy loop gap-free even on large screens.
const MIN_UNITS = 8
const base = phrases.length ? phrases : ["最高の食べ物"]
const units = Array.from(
  { length: Math.ceil(MIN_UNITS / base.length) },
  () => base
)
  .flat()
  // Split each phrase into characters so individual ones can be highlighted.
  .map((phrase) =>
    Array.from(phrase).map((char) => ({
      char,
      accent: accentChars.includes(char),
    }))
  )

// ---- Marquee animation --------------------------------------------------
const NORMAL_SPEED = 70 // px / second
const HOVER_SPEED = 18 // px / second while hovered
const EASE = 6 // how quickly the current speed approaches its target

const track = ref<HTMLElement | null>(null)

let offset = 0
let speed = NORMAL_SPEED
let target = NORMAL_SPEED
let groupWidth = 0
let raf = 0
let last = 0

const measure = () => {
  const first = track.value?.firstElementChild as HTMLElement | null
  if (first) groupWidth = first.offsetWidth
}

const frame = (now: number) => {
  if (!last) last = now
  const dt = (now - last) / 1000
  last = now

  // Ease the current speed toward its target for a soft slow-down on hover.
  speed += (target - speed) * Math.min(1, EASE * dt)

  offset -= speed * dt
  // Wrap once a full group has scrolled past so the motion never breaks.
  if (groupWidth > 0) while (offset <= -groupWidth) offset += groupWidth
  if (track.value) track.value.style.transform = `translate3d(${offset}px, 0, 0)`

  raf = requestAnimationFrame(frame)
}

const slowDown = () => (target = HOVER_SPEED)
const speedUp = () => (target = NORMAL_SPEED)

onMounted(() => {
  measure()
  // Re-measure once webfonts have loaded, as glyph widths change the total.
  document?.fonts?.ready.then(measure)
  window.addEventListener("resize", measure)

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!reduced) raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener("resize", measure)
})
</script>

<template>
  <div
    class="w-full select-none overflow-hidden whitespace-nowrap cursor-pointer"
    @mouseenter="slowDown"
    @mouseleave="speedUp"
  >
    <div ref="track" class="flex w-max will-change-transform">
      <!-- Two identical groups sit side by side; when the first scrolls fully
           past, the offset wraps so the loop is seamless. -->
      <div
        v-for="copy in 2"
        :key="copy"
        class="flex items-center"
        :aria-hidden="copy === 2 || undefined"
      >
        <span
          v-for="(unit, i) in units"
          :key="`${copy}-${i}`"
          class="inline-flex items-center gap-4 pr-4 sm:gap-7 sm:pr-7 font-forum text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-[0.05em] text-textish"
        >
          <NuxtImg src="/icons/slider__icon.svg" class="h-6 w-6 sm:h-10 sm:w-10 flex-none" alt=""/>
          <span>
            <span
              v-for="(c, ci) in unit"
              :key="ci"
              :class="c.accent ? 'text-pinkish' : ''"
              >{{ c.char }}</span
            >
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
