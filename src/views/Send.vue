<template>
  <main id="send">
    <section class="send-header">
      <div
        class="step-1 step-item active"
        :class="{ current: stage == 1 }"
        @click="navigate(1)"
      >
        <div class="index">1</div>
        <div class="step">Enter Your Details</div>
      </div>
      <div class="divider"></div>
      <div
        class="step-2 step-item"
        :class="{ active: stage > 1, current: stage == 2 }"
        @click="navigate(2)"
      >
        <div class="index">2</div>
        <div class="step">Confirm Details</div>
      </div>
      <div class="divider"></div>
      <div
        class="step-3 step-item"
        :class="{ active: stage > 2, current: stage == 3 }"
        @click="navigate(3)"
      >
        <div class="index">3</div>
        <div class="step">Result</div>
      </div>
    </section>
    <div class="container">
      <transition name="fadeHeight" mode="out-in">
        <div class="step-1" v-show="stage == 1">
          <h1>Send Money</h1>
          <form action="">
            <div class="form-header">Personal Details</div>
            <div class="form-body">
              <transition name="fadeError" mode="out-in">
                <div class="form-error" v-show="errors.includes('general')">
                  Transfer Limit is $1,000
                </div>
              </transition>
              <div class="form-group">
                <small>Recipient Username</small>
                <input type="text" v-model="account" />
                <transition name="fadeError" mode="out-in">
                  <div
                    class="error-message"
                    v-show="errors.includes('account')"
                  >
                    Please enter a valid username
                  </div>
                </transition>
              </div>
              <div class="form-group">
                <small>You Send</small>
                <div
                  class="input-group"
                  :class="{ 'error-within': errors.includes('from') }"
                >
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
                  Exchange Rate 1 {{ base.code.toUpperCase() }} =
                  {{ recipient.rate.toFixed(2) }}
                  {{ recipient.code.toUpperCase() }}
                </p>
              </div>
              <div class="row fees">
                <small>Fees (10%)</small>
                <p>- {{ fees }} {{ base.code.toUpperCase() }}</p>
              </div>
              <div class="row total">
                <small>Total </small>
                <small>{{ total }} {{ base.code.toUpperCase() }}</small>
              </div>
              <button class="btn" @click.prevent="enterDetails">
                Continue
              </button>
            </div>
          </form>
        </div>
      </transition>
      <transition name="fadeHeight" mode="out-in">
        <div class="step-2" v-show="stage == 2">
          <div class="header">
            <span class="back" @click="stage = 1"
              ><i class="fas fa-arrow-left"></i> Back</span
            >
          </div>
          <form action="">
            <div class="form-header">Payment Details</div>
            <div class="form-body">
              <div class="form-group">
                <small>Description</small>
                <textarea
                  name=""
                  id=""
                  placeholder="Write here description (optional)"
                >
                </textarea>
              </div>
            </div>
            <div class="form-body">
              <div class="row recipient-info">
                <small>Recipient</small>
                <p>{{ account }}</p>
              </div>
              <div class="row transfer-info">
                <div class="">
                  <small>Send Amount </small>
                  <p>
                    {{ (from * 1).toFixed(2) }} {{ base.code.toUpperCase() }}
                  </p>
                </div>
                <div class="">
                  <small>Fees (10%)</small>
                  <p>{{ fees }} {{ base.code.toUpperCase() }}</p>
                </div>
              </div>
              <div class="row total">
                <small>Total </small>
                <small>{{ total }} {{ base.code.toUpperCase() }}</small>
              </div>
              <button class="btn" @click.prevent="makePayment">
                Send Money
              </button>
            </div>
          </form>
        </div>
      </transition>
      <transition name="fadeHeight" mode="out-in">
        <div class="step-3" v-show="stage == 3">
          <div class="header">&nbsp;</div>
          <form action="" v-if="successful">
            <div class="container">
              <div class="icon success"><i class="fas fa-check"></i></div>
              <h4>Successful</h4>
              <h5>Transaction is completed.</h5>
              <p>
                You've successfully sent ${{ (from * 1).toFixed(2) }} to
                {{ account }}. <br />
                See transaction details under Transaction.
              </p>
              <div class="btn">
                <i class="fas fa-print"></i> <span>Print</span>
              </div>
              <strong @click="stage = 1">Restart</strong>
            </div>
          </form>
          <form action="" v-else>
            <div class="container">
              <div class="icon failure"><i class="fas fa-times"></i></div>
              <h4>Transaction Failed</h4>
              <h5>Something went wrong</h5>
              <p>
                Most likely, your transfer amount exceeded the test amount for
                Flutterwave or the daily limit has been exceeded <br />
                Try transfers below $900
              </p>
              <div class="btn" @click="stage = 1">
                <i class="fas fa-redo"></i>
                <span>Retry</span>
              </div>
            </div>
          </form>
        </div>
      </transition>
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
      stage: 1,
      account: "",
      baseCurrency: "usd",
      toCurrency: "ngn",
      from: "",
      to: "",
      successful: false,
      errors: [],
    };
  },
  computed: {
    ...mapState(["currencies", "flutterwave"]),
    base: function () {
      let base = this.currencies.find(
        (currency) =>
          currency.code.toUpperCase() == this.baseCurrency.toUpperCase()
      );

      return base;
    },
    recipient: function () {
      let recipient = this.currencies.find(
        (currency) =>
          currency.code.toUpperCase() == this.toCurrency.toUpperCase()
      );
      return recipient;
    },
    fees: function () {
      return (this.from * 0.1).toFixed(2);
    },
    total: function () {
      return (this.from * 1.1).toFixed(2);
    },
  },
  watch: {
    from: function (newValue, oldValue) {
      if (newValue == "") {
        this.from = "";
        this.to = "";
        return;
      }
      if (this.errors.includes("from") && isValidInput(newValue)) {
        removeItemOnce(this.errors, "from");
      }
      if (isNaN(newValue * 1)) {
        this.from = oldValue;
        return;
      }
      if (newValue.includes(".")) {
        if (newValue.split(".")[1].length > 2) {
          this.from = oldValue;
          this.changeRecipientValue();
        }
      }
      if (newValue * 1 > 1000) {
        this.from = oldValue;
        this.changeRecipientValue();
        this.triggerErrorMessage("Transfer Limit is $1,000");
      }
    },
    to: function (newValue, oldValue) {
      if (newValue == "") {
        this.from = "";
        this.to = "";
      }
      if (this.errors.includes("to") && isValidInput(newValue)) {
        removeItemOnce(this.errors, "to");
      }
      if (isNaN(newValue * 1)) {
        this.to = oldValue;
        return;
      }
      if (newValue.includes(".")) {
        if (newValue.split(".")[1].length > 2) {
          this.to = oldValue;
          this.changeBaseValue();
        }
      }
    },
    account: function (newValue) {
      if (isValidInput(newValue) && this.errors.includes("account")) {
        removeItemOnce(this.errors, "account");
      }
    },
    stage: function (newValue, oldValue) {
      if (oldValue == 3) {
        this.reset();
      }
    },
  },
  methods: {
    ...mapActions(["fetchCurrenies"]),
    triggerErrorMessage: function () {
      this.errors.push("general");
      setTimeout(() => {
        removeItemOnce(this.errors, "general");
      }, 1000);
    },
    changeRecipientValue: function () {
      this.to = (this.from * this.recipient.rate).toFixed(2);
    },
    changeBaseValue: function () {
      this.from = (this.to / this.recipient.rate).toFixed(2);
    },
    reset: function () {
      this.account = "";
      this.from = "";
      this.to = "";
      //
    },
    navigate: function (value) {
      if (value < this.stage) {
        this.stage = value;
      }
    },
    checkForErrors: function () {
      this.erros = [];
      if (!isValidInput(this.account)) {
        this.errors.push("account");
      }
      if (!isValidInput(this.from)) {
        this.errors.push("from");
      }
      if (!isValidInput(this.to)) {
        this.errors.push("to");
      }
    },
    enterDetails: function () {
      this.checkForErrors();
      if (this.errors.length < 1) {
        this.stage++;
      }
    },
    makePayment() {
      this.$launchFlutterwave({
        public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
        tx_ref: "RX1",
        amount: this.total,
        currency: "USD",
        country: "US",
        payment_options: " ",
        meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: "cornelius@gmail.com",
          phone_number: "08102909304",
          name: "Flutterwave Developers",
        },
        callback: () => {
          this.successful = true;
          this.stage = 3;
        },
        onclose: () => {
          // close modal
          this.stage = 3;
        },
        customizations: {
          title: "WiseMoney",
          description: "Send Money",
          logo: "https://assets.piedpiper.com/logo.png",
        },
      });
    },
  },
  created() {
    this.fetchCurrenies({
      code: "usd",
      html: "&#36;",
      class: "currency-flag-usd",
      rate: 0,
    });
  },
};

const isValidInput = (value) => {
  return value !== "" && value !== null && typeof value !== "undefined";
};
const removeItemOnce = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
</script>

<style>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.35s;
  max-height: 415px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}

.fadeError-enter-active,
.fadeError-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeError-enter,
.fadeError-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
