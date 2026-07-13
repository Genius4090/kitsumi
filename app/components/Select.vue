<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next'

const model = defineModel()
const props = defineProps<{ guestsCount?: number[] }>();
</script>

<template>
  <div class="relative">
    <select
      v-model="model"
      class="w-full appearance-none border border-borderish bg-grayish outline-none py-4 pl-6 pr-12 rounded-[10px] text-textish placeholder:text-textish/40 cursor-pointer"
    >
      <option disabled value="">Number of guests</option>

      <option
        v-for="guest in props.guestsCount"
        :key="guest"
        :value="guest"
      >
        {{ guest }} {{ guest === 1 ? "Guest" : "Guests" }}
      </option>

      <option value="more">More than 6 Guests</option>
    </select>

    <ChevronDown
      class="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-textish/60"
    />
  </div>
</template>