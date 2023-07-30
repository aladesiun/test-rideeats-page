<template>
  <div class="container">
    <!-- vendor -->
    <div class="mx-auto block lg:w-[800px] overflow-x-hidden">
      <!-- adding all vendor form components --> 
      <div class="flex justify-center items-center flex-col min-h-[100vh] pt-10"  v-if="!businessAndBrandTypes">

      </div>
      <div class="flex justify-center items-center flex-col min-h-[100vh] pt-10" v-else>
        <div v-if="isLoading" class="fixed bg-[#00000080] top-0 left-0 right-0 bottom-0 z-50">
          <div class="loader-container absolute top-0 left-0 right-0 bottom-0 m-auto w-10 h-10">
            <div class="loader"></div>
            <div class="loader-inner"></div>
          </div>
        </div>
        <transition name="fade" >
          <BusinessInfo
            v-show="pageStepper == 1" 
            v-model="vendorDetails.businessInfo"
            :business-types="businessAndBrandTypes.business_types ?? []"
            :pageStepper="pageStepper" @pageStepper="updatePageStepper" />
        </transition>
        <transition name="fade">
          <SellerInfo :sellerInfo="vendorDetails.sellerInfo" :pageStepper="pageStepper" v-show="pageStepper == 2"
            @pageStepper="updatePageStepper" />
        </transition>
        <!-- <transition name="fade">
          <BrandType v-show="pageStepper == 3" v-model="vendorDetails.brandType" @pageStepper="updatePageStepper"
            :brand-type="businessAndBrandTypes.brand_types ?? []" :pageStepper="pageStepper" />

        </transition> -->
        <transition name="fade">
          <Document v-show="pageStepper == 3" :documentInfo="vendorDetails.docs" :pageStepper="pageStepper"
            @pageStepper="updatePageStepper" :registerVendor="registerVendor" @emit-register-vendor="registerVendor" />
        </transition>

        <transition name="fade">
          <VendorRegistrationSuccess v-show="pageStepper == 4"  />
        </transition>
      </div>
    </div>
  </div>

</template> 

<script setup>

import {reactive, ref, watch } from "vue"; 
import BusinessInfo from "~/components/vendor/businessInfo.vue";
import SellerInfo from "~/components/vendor/sellerInfo.vue";
import Document from "~/components/vendor/document.vue";
import { vendorData } from "../../config/data/vendor_data";
import { useNotificationStore } from  '../../store/notification'

const runtimeConfig = useRuntimeConfig()

const  { data:businessAndBrandTypes } = await useFetch(runtimeConfig.public.APP_BASE_URL+'vendor/brand-and-business-types');

const store = useNotificationStore();

const pageStepper = ref(1);
const isLoading = ref(false);

const updatePageStepper = (val) => {
  pageStepper.value = val 
}
const vendorDetails = reactive(vendorData);

// prepare payload (check the composable)
const { payLoad, processPayload } = UseVendorPayload(vendorDetails);


watch(vendorDetails, ()=> {
   processPayload();
}, {deep:true});


const registerVendor = () => {
  isLoading.value = true;
  $fetch("https://apis.rideeat.org/api/vendor/onboarding", {
    method: "post",
    body: payLoad.value
  }).then((res) => {
    // store.setNotification({type: 1, message:'Vendor registration sucsessful', time: 2000});
    updatePageStepper(4); 
    isLoading.value = false;
    vendorDetails= vendorData;
    // navigateTo('/');
  }).catch((err) => {
    store.setNotification({type: 2, message:err.data.message, time: 3000})
    isLoading.value = false;
  })

}

</script>
<style scoped>
.loader{
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  border: 2px solid lightgray;
  border-radius: 100px;
  width: 35px;
  height: 35px;
  padding: 0;
}
.loader-inner{ 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-left: 2px solid orange;
  border-radius: 100px;
  width: 35px;
  height: 35px; 
  margin: 0;
  display: block;
  animation: rotateKey .5s linear infinite;
  padding: 0;
}
@keyframes rotateKey {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>

