<template>
  <div
    class="custom-select-image-vue"
    @click="dropdownActive = !dropdownActive"
    tabindex="0"
    @blur="dropdownActive = false"
  >
    <div class="selected">
      <div
        class="user-img"
        v-show="!isEmpty(this.selected)"
        :class="
          'flag currency-flag currency-flag-' + this.selected.code.toLowerCase()
        "
      ></div>
      <span>{{
        isEmpty(this.selected) ? this.defaultText : selected.code.toUpperCase()
      }}</span>
    </div>
    <ul class="select-image-items" :class="{ 'select-hide': !dropdownActive }">
      <li
        class="select-items_item"
        v-for="(value, index) in values"
        :key="index"
        @click="changeValue(value)"
      >
        <div
          class="user-img"
          :class="
            'flag currency-flag currency-flag-' + value.code.toLowerCase()
          "
        ></div>
        <span>{{ value.code.toUpperCase() }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "CustomSelectImage",
  props: {
    values: {
      type: Array,
      default: function () {
        return [
          {
            code: "ngn",
            html: "&#8358;",
            rate: 0,
          },
          {
            code: "kes",
            html: "KSH",
            rate: 0,
          },
          {
            code: "ghs",
            html: "&#8373;",
            rate: 0,
          },
          {
            code: "gbp",
            html: "&#163;",
            rate: 0,
          },
          {
            code: "usd",
            html: "&#36;",
            rate: 0,
          },
        ];
      },
    },
    value: {
      type: String,
      default: function () {
        return "usd";
      },
    },
    defaultText: {
      type: String,
      default: function () {
        return "Select One";
      },
    },
    disabled: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      dropdownActive: false,
      selected: {},
    };
  },
  methods: {
    changeValue: function (value) {
      this.selected = value;
      this.$emit("input", value.code);
    },
    isEmpty(obj) {
      return $.isEmptyObject(obj);
    },
  },
  created() {
    this.selected = this.values.find(
      (value) => value.code.toLowerCase() == this.value
    );
  },
};
</script>

<style></style>
