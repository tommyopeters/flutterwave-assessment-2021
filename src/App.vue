<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "currency-flags/dist/currency-flags.min.css";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
@import "./assets/sass/main.scss";
</style>
