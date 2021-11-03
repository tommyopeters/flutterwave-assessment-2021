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
                <div class="currency-symbol"></div>
                <input type="text" />
                <div class="currency">
                  <div class="flag"></div>
                  <div class="currency-code">USD</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <small>Recipient Gets</small>
              <div class="input-group">
                <div class="currency-symbol"></div>
                <input type="text" />
                <div class="currency">
                  <div class="flag"></div>
                  <div class="currency-code">USD</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
