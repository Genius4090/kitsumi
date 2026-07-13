<script lang="ts" setup>
import { ref, nextTick, watch, onBeforeUnmount } from "vue";
import { animate } from "motion-v";

interface menuType {
  id: number;
  path: string;
  content: string;
}

const menuList: menuType[] = [
  {
    id: 1,
    path: "/menu",
    content: "menu",
  },
  {
    id: 2,
    path: "/reservation",
    content: "reservation",
  },
  {
    id: 3,
    path: "/about",
    content: "about",
  },
  {
    id: 4,
    path: "/contact",
    content: "contact",
  },
  {
    id: 5,
    path: "/",
    content: "main",
  },
];

const toggleMenu = useState<boolean>("toggleMenu")
const route = useRoute()

// v-show is driven by `shown`, not toggleMenu directly, so closing can
// play the exit animation before the menu disappears.
const shown = ref(false)
const rootEl = ref<HTMLElement>()
let closing: { stop(): void } | null = null

watch(toggleMenu, async (open) => {
  if (prefersReducedMotion()) {
    shown.value = open
    return
  }

  if (open) {
    closing?.stop()
    closing = null
    shown.value = true
    await nextTick()
    const root = rootEl.value
    if (!root) return
    // Explicit [from, to] keyframes: motion caches element state between
    // runs, so relying on inline styles as the start value breaks re-opens.
    animate(root, { opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" })
  } else if (shown.value) {
    const root = rootEl.value
    if (root) {
      closing = animate(root, { opacity: 0 }, { duration: 0.2, ease: "easeIn" })
      await closing
      closing = null
    }
    shown.value = false
  }
})

function toggleFn(){
toggleMenu.value = false
}

// Link to the current page doesn't change the route, so page:finish
// below would never fire — close immediately in that case.
function handleLinkClick(path: string){
  if (path === route.path) toggleFn()
}

// The menu stays up covering the route swap (the global middleware skips
// the page transition while it's open) and fades out once the new page
// has finished loading.
const nuxtApp = useNuxtApp()
const unhook = nuxtApp.hook("page:finish", () => {
  if (toggleMenu.value) setTimeout(toggleFn, 150)
})
onBeforeUnmount(unhook)
</script>

<template>
    <section
      v-show="shown"
      ref="rootEl"
      class="w-full h-dvh bg-blackish fixed top-0 left-0 z-50 p-4 flex items-center justify-center"
      @click="toggleFn"
    >

      <div class="border border-borderish w-full h-full flex items-center justify-center rounded-2xl" >
        <ul class="flex flex-col gap-3 md:gap-4 items-center max-h-full overflow-y-auto py-6" >
       <HeadingIcon/>
          <li v-for="item in menuList" :key="item.id" class=" font-forum text-4xl sm:text-5xl md:text-8xl uppercase text-center cursor-pointer hover:text-pinkish duration-300" >
            <NuxtLink :to="item.path" @click.stop="handleLinkClick(item.path)">{{ item.content }}</NuxtLink>
          </li>
          <HeadingIcon/>

        </ul>
       </div>
    </section>
  </template>
