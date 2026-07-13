<script lang="ts" setup>
import Footer from '~/components/Footer.vue';
const toggleMenu = useState<boolean>("toggleMenu",()=> false)
</script>

<template>
<header>
<NavMenu/>
  <Navbar/>
</header>
<main class="min-h-screen">
  <slot/>
</main>
 <footer>
  <Footer/>
 </footer>
</template>
