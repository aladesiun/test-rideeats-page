<!-- Please remove this file from your project -->
<template>
  <div class="bg-[#162D4F] py-[40px] text-white z-20">
    <div class="container">
      <div class=" grid md:grid-cols-5">
        <div class="w-full md:pr-[40px]">
          <div class="logo-cont mb-5">
            <img src="../../assets/images/rideeatLogo.png" class="w-[200px]" />
          </div>
          <p class="text-white text-xs md:block hidden">Your favourite Restaurants at your fingertips.
            Over 450 Meals delivered to over 200 customers</p>
        </div>
        <div class=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 col-span-4 my-5">
          <div class="w-full">
            <p class="font-sembold mb-4">Quick Link</p>
            <ul class="m-0">
              <li class="my-3 font-light text-xs"><nuxt-link to="#">About Us</nuxt-link></li>
              <li class="my-3 font-light text-xs sm:block hidden"><nuxt-link to="#">Prdouct</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Become a Vendor</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Become a Rider</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="/contact-us">Contact Us</nuxt-link></li>
            </ul>
          </div>

          <!-- <div class="w-full sm:block hidden">
            <p class="font-sembold mb-4">Cities</p>
            <ul class="m-0">
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Lagos</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Ajah</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Lautech</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Ogun</nuxt-link></li>
            </ul>
          </div> -->

          <div class="w-full">
            <p class="font-sembold mb-4">Useful Link</p>
            <ul class="m-0">
              <li class="my-3 font-light text-xs"><nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Terms and Conditions</nuxt-link></li>
              <li class="my-3 font-light text-xs sm:block hidden"><nuxt-link to="#">support</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">FAQs</nuxt-link></li>
            </ul>
          </div>

          <div class="w-full sm:block hidden">
            <p class="font-sembold mb-4">Contact</p>
            <ul class="m-0">
              <li class="my-3 font-light text-xs"><nuxt-link to="#">(+234) 903 456 0333</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">support@rideeat.com</nuxt-link></li>
              <li class="my-3 font-light text-xs"><nuxt-link to="#">Ogbomoso, Oyo State, Nigeria.</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h-[2px] my-4 w-full bg-[#F46F2A]"> </div>
      <div class="flex justify-between">
        <div class="flex cursor-pointer">
          <i class="fa-brands mr-1 fa-twitter"></i>
          <i class="fa-brands mx-1 fa-facebook"></i>
          <i class="fa-brands mx-1 fa-instagram"></i>
          <i class="fa-brands ml-1 fa-linkedin"></i>

        </div>
        <p class="text-xs ml-5">© 2021 Copyright 2021 Ride Eat, All rights reserved</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavHeader from '~/components/NavHeader.vue';
import DownloadApp from '~/components/DownloadApp.vue';
import {
  defineComponent,
  ref,

} from 'vue'





export default defineComponent({
  name: "Footer",
  components: { NavHeader, DownloadApp }
})
</script>
  