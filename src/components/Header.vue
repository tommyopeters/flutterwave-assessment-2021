<template>
  <header>
    <div class="container">
      <div class="logo">
        <div class="image-control vertical">
          <img class="desktop" src="@/assets/images/logo.png" alt="" />
          <img class="mobile" src="@/assets/images/logo-icon.png" alt="" />
        </div>
      </div>
      <nav>
        <ul>
          <Link to="/dashboard" el="li">Dashboard</Link>
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
      <div class="mobile-menu">
        <input type="checkbox" name="" id="mobile-menu" />
        <label for="mobile-menu">
          <div class="hamburger"><span></span><span></span><span></span></div>
        </label>
        <nav>
          <ul class="nav-list">
            <Link to="/dashboard" el="li">Dashboard</Link>
            <Link to="/transactions" el="li">Transactions</Link>
            <Link to="/send" el="li">Send</Link>
            <Link to="/account" el="li">Account</Link>

            <li>Log Out</li>
          </ul>
        </nav>
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
