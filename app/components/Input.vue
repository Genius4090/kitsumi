<script lang="ts" setup>
const model = defineModel()
const props = withDefaults(defineProps<{ type?: string }>(), { type: "text" })
</script>

<template>
    <input :type="props.type" v-model="model" class="w-full border border-borderish bg-grayish outline-none py-4 px-6 rounded-[10px] text-textish placeholder:text-textish/40">
</template>
