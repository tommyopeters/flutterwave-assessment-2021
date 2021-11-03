<template>
  <footer>
    <div class="container">
      <div class="row">
        <ul class="pages">
          <Link to="/" el="li"> About Us</Link>
          <li>Support</li>
          <li>Help</li>
          <li>Affiliate</li>
          <li>Fees</li>
        </ul>
        <ul class="socials">
          <li><i class="fab fa-facebook-f"></i></li>
          <li><i class="fab fa-twitter"></i></li>
          <li><i class="fab fa-instagram"></i></li>
          <li><i class="fab fa-linkedin-in"></i></li>
        </ul>
      </div>
      <div class="row">
        <div class="copyright">
          &copy; 2021 All rights reserved by Tommy O'Peters
        </div>
        <ul class="policies">
          <li>Privacy Policy</li>
          <li>Terms of Conditions</li>
          <li>Legal</li>
          <li>Help</li>
        </ul>
      </div>
    </div>
  </footer>
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
