<script lang="ts" setup>
const introDone = useIntroDone();
</script>

<template>
  <AppPreloader @complete="introDone = true" />
  <NuxtLayout><NuxtPage /></NuxtLayout>
</template>
