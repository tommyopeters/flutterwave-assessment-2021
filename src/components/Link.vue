<template>
  <router-link :to="to" v-slot="{ navigate, isActive }" custom>
    <div
      v-if="el == 'div'"
      :class="[classes, { active: isActive }]"
      @click="navigate"
    >
      <slot></slot>
    </div>
    <li v-else :class="[classes, { active: isActive }]" @click="navigate">
      <slot></slot>
    </li>
  </router-link>
</template>

<script>
export default {
  props: ["to", "el", "classes"],
};
</script>

<style></style>
