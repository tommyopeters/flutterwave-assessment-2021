<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <Loader v-if="loading" />
    </transition>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import "currency-flags/dist/currency-flags.min.css";

import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Loader,
    Header,
    Footer,
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
<style lang="scss">
@import "./assets/sass/main.scss";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
