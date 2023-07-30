<!-- Please remove this file from your project -->
<template>
  <div class="w-ful bg-white py-2 sticky top-0 z-50">
    <div class="justify-between lg:flex items-center container ">
      <div class="lg:flex justify-between items-center xl:w-[40%] relative ">
        <div class="lg:hidden absolute top-[17px] right-4"><i @click="toggle"
            :class="!navToggle ? 'fa-solid fa-bars text-lg' : 'hidden'"></i><i @click="toggle"
            :class="navToggle ? 'fa-solid fa-xmark text-lg' : 'hidden'"></i>
          </div>
        <div class="logo-cont max-w-[250px] flex">
          <nuxt-link to="">
            <img src="../assets/images/rideeatLogo.png" class="w-[200px]" />
          </nuxt-link>
        </div>
        <transition name="fade">

          <div :class="!navToggle ? 'hidden lg:flex ' : ' block mt-[30px] z-20'">
            <ul class="flex justify-between">
              <li
                :class="route.name.includes('privacy-policy') ? 'capitalize hover:text-[#FF8900] sm:mr-3 text-[#FF8900]' : 'capitalize hover:text-[#FF8900] sm:mr-3'">
                <nuxt-link to="privacy-policy">privacy-policy</nuxt-link></li>
              <li
                :class="route.name.includes('contact-us') ? 'capitalize hover:text-[#FF8900] sm:mr-3 text-[#FF8900]' : 'capitalize hover:text-[#FF8900] sm:mr-3'">
                <nuxt-link to="contact-us">Contact Us</nuxt-link></li>
              <!-- <li class="capitalize hover:text-[#FF8900] lg:ml-3"><nuxt-link to="/contact">contact</nuxt-link></li> -->
            </ul>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div :class="!navToggle ? 'py-0 sm:py-4 hidden lg:flex' : 'block py-0 my-3 sm:py-4 z-20'">
          <nuxt-link to="becomeavendor/register"
            :class="route.name.includes('becomeavendor') ? 'btn-filled sm:mr-3 flex-center-all lg:my-0 my-7 vendor' : 'btn-transparent sm:mr-3 flex-center-all lg:my-0 my-7 vendor'">Become
            a Vendor</nuxt-link>
          <nuxt-link to="becomearider/register"
            :class="route.name.includes('becomearider') ? 'btn-filled sm:mr-3 flex-center-all lg:my-0 my-7 vendor' : 'btn-transparent sm:mr-3 flex-center-all lg:my-0 my-7 vendor'">Become
            a Rider</nuxt-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script >
import {
  defineComponent,
  ref,
} from 'vue'

export default defineComponent({
  name: 'NavHeader',
  setup() {
    const route = useRoute();
    const navToggle = ref(false);
    const toggle = () => {
      navToggle.value = !navToggle.value;
    }
    watch(
            () => route.path,
            (to, from) => {
              toggle()
            }
        );
    return { navToggle, toggle, route, }
  }
});
</script>

<style>
a.nuxt-link-active {
  color: pink;
}

.nuxt-link-exact-active {
  color: #FF8900 !important;
}

.vendor a.nuxt-link-exact-active {
  color: #FF8900;
  background: red;
}

.rider a.nuxt-link-exact-active {
  color: #FF8900;
  background: red;
}

.white {
  color: white !important;
  ;
}</style>