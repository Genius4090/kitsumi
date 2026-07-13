<script setup lang="ts">
import LineIcon from "./main/LineIcon.vue";
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-4">
    <LineIcon width="60" class="w-8 sm:w-[60px] shrink-0" />
    <p class="font-forum uppercase text-[clamp(1.25rem,4.5vw,2.5rem)]">
      <slot />
    </p>
    <LineIcon class="scale-x-[-1] w-8 sm:w-[60px] shrink-0" width="60" />
  </div>
</template>
