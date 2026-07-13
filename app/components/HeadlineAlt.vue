<template>
  <div class="flex items-center gap-4">
    <NuxtImg src="/icons/line__icon__small.svg" width="30"/>
    <p class=" uppercase">
      <slot />
    </p>
    <NuxtImg src="/icons/line__icon__small.svg" class="scale-x-[-1]" width="30"/>
  </div>
</template>

