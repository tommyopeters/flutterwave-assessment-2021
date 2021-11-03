<template>
  <main id="send">
    <section class="send-header">
      <div class="step-1 step-item active">
        <div class="index">1</div>
        <div class="step">Enter Your Details</div>
      </div>
      <div class="divider"></div>
      <div class="step-2 step-item active">
        <div class="index">2</div>
        <div class="step">Confirm Details</div>
      </div>
      <div class="divider"></div>
      <div class="step-3 step-item">
        <div class="index">3</div>
        <div class="step">Success</div>
      </div>
    </section>
    <div class="container">
      <div class="step-1">
        <h1>Send Money</h1>
        <form action="">
          <div class="form-header">Personal Details</div>
          <div class="form-body">
            <div class="form-group">
              <small>Recipient</small>
              <input type="text" />
            </div>
            <div class="form-group">
              <small>You Send</small>
              <div class="input-group">
                <div class="currency-symbol" v-html="base.html"></div>
                <input
                  type="text"
                  v-model="from"
                  @input="changeRecipientValue"
                />
                <div class="custom-select-image-vue no-change">
                  <div class="selected">
                    <div
                      class="user-img flag currency-flag currency-flag-usd"
                    ></div>
                    <span>USD</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <small>Recipient Gets</small>
              <div class="input-group">
                <div class="currency-symbol" v-html="recipient.html"></div>
                <input type="text" v-model="to" @input="changeBaseValue" />
                <CustomSelectImage
                  v-model="toCurrency"
                  @input="changeRecipientValue"
                ></CustomSelectImage>
              </div>
            </div>
            <div class="exchange-info">
              <p>
                Current Exchange Rate 1 {{ base.code.toUpperCase() }} =
                {{ recipient.rate.toFixed(2) }}
                {{ recipient.code.toUpperCase() }}
              </p>
            </div>
            <div class="row fees">
              <small>Fees</small>
              <small
                >- {{ (from * 0.1).toFixed(2) }}
                {{ base.code.toUpperCase() }}</small
              >
            </div>
            <div class="row total">
              <small>Total </small>
              <small
                >{{ (from * 1.1).toFixed(2) }}
                {{ base.code.toUpperCase() }}</small
              >
            </div>
            <button class="btn">Continue</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CustomSelectImage from "@/components/CustomSelectImage";

export default {
  components: {
    CustomSelectImage,
  },
  data() {
    return {
      baseCurrency: "usd",
      toCurrency: "ngn",
      from: "",
      to: "",
    };
  },
  computed: {
    ...mapState(["currencies"]),
    base: function () {
      let base = this.currencies.find(
        (currency) =>
          currency.code.toUpperCase() == this.baseCurrency.toUpperCase()
      );

      console.log(base);
      return base;
    },
    recipient: function () {
      let recipient = this.currencies.find(
        (currency) =>
          currency.code.toUpperCase() == this.toCurrency.toUpperCase()
      );
      return recipient;
    },
  },
  watch: {
    from: function (newValue, oldValue) {
      if (newValue == "") {
        this.from = "";
        this.to = "";
      }
      if (isNaN(newValue * 1)) {
        this.from = oldValue;
        return;
      }
    },
    to: function (newValue, oldValue) {
      if (newValue == "") {
        this.from = "";
        this.to = "";
      }
      if (isNaN(newValue * 1)) {
        this.to = oldValue;
        return;
      }
    },
  },
  methods: {
    ...mapActions(["fetchCurrenies"]),
    changeRecipientValue: function () {
      this.to = (this.from * this.recipient.rate).toFixed(2);
    },
    changeBaseValue: function () {
      this.from = (this.to / this.recipient.rate).toFixed(2);
    },
  },
  created() {
    this.fetchCurrenies({
      code: "usd",
      html: "&#36;",
      class: "currency-flag-usd",
      rate: 0,
    });
    console.log(this.currencies);
  },
};
</script>

<style></style>
