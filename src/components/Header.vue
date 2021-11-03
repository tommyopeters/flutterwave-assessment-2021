<template>
  <header>
    <div class="container">
      <div class="logo">
        <div class="image-control vertical">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
      </div>
      <nav>
        <ul>
          <Link to="/daashboard" el="li">Dashboard</Link>
          <Link to="/transactions" el="li">Transactions</Link>
          <Link to="/send" el="li">Send</Link>
          <Link to="/account" el="li">Account</Link>
        </ul>
      </nav>
      <div class="menu">
        <div class="user">
          <div class="user-image image-control">
            <img src="@/assets/images/user.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Link from "@/components/Link";

export default {
  components: {
    Link,
  },
};
</script>

<style></style>
