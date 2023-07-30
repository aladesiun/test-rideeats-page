<template>
    <div class="container my-9 block  min-h-[65vh]">
        <div v-if="isLoading" class="fixed bg-[#00000080] top-0 left-0 right-0 bottom-0 z-50">
          <div class="loader-container absolute top-0 left-0 right-0 bottom-0 m-auto w-10 h-10">
            <div class="loader"></div>
            <div class="loader-inner"></div>
          </div>
        </div>
        
        <div>
            <form class="lg:w-[700px] mx-auto my-9 ">
                <transition name="fade">
                    <div>
                        <RiderInfo 
                            v-show="pageStepper == 1" 
                            :pageStepper="pageStepper" 
                            @pageStepper="updatePageStepper"
                            v-model="riderDetails.address" />

                    </div>
                </transition>
                <transition name="fade">
                    <div> 
                        <Biodata 
                            v-show="pageStepper == 2" 
                            :pageStepper="pageStepper"
                            @pageStepper="updatePageStepper"
                            :types="riderTypes"
                            v-model="riderDetails.contact" />

                    </div>
                </transition>
                <transition name="fade">
                    <div>
                        <Ready 
                            v-show="pageStepper == 3"
                            :pageStepper="pageStepper"
                            @pageStepper="updatePageStepper"
                            v-model="riderDetails.docs"

                        />

                    </div>
                </transition>
                <transition name="fade">
                    <VendorRegistrationSuccess v-show="pageStepper == 4"  />
                </transition>
            </form>
        </div>
    </div>
</template> 
<script lang="ts">
import { defineComponent } from 'vue'
import Biodata from '~~/components/rider/biodata.vue';
import Ready from '~~/components/rider/ready.vue';
import RiderInfo from '~~/components/rider/riderInfo.vue';
import { riderData } from '~~/config/data/rider_details';
import { useNotificationStore } from  '../../store/notification'
import VendorRegistrationSuccess from '~~/components/vendor/RegistrationSuccess.vue';

export default defineComponent({
    components: { Biodata, Ready, RiderInfo, VendorRegistrationSuccess },
    setup() {
        const riderDetails = reactive(riderData);
        const pageStepper = ref(1);
        const isLoading = ref(false);
        const store = useNotificationStore();
        const riderTypes = ref([]);
        const completed = ref(false)

        
        const updatePageStepper = (val: number) => {
            if(val <= 3 || (val > 3 && completed.value)){
                pageStepper.value = val;
            }else{
                console.log(riderDetails)
                submitHandler()
            }
        }
 
        const getRiderTypes = async ()=>{
            const { data } = await useFetch('https://apis.rideeat.org/api/rider/rider-types');
            riderTypes.value = data.value.rider_types;  
        }

        getRiderTypes();
        
        const submitHandler = ()=>{
            isLoading.value = true;
            $fetch("https://apis.rideeat.org/api/rider/onboarding", {
                method: "post",
                body: {
                    ...riderDetails,
                    contact: {...riderDetails.contact, rider_type: riderDetails.contact.rider_type.id}
                }
            }).then((res) => {
                // store.setNotification({type: 1, message:'Vendor registration sucsessful', time: 2000});
                completed.value = true;
                updatePageStepper(4); 
                isLoading.value = false;
                // navigateTo('/');
            }).catch((err) => {
                store.setNotification({type: 2, message:err.data.message, time: 3000})
                isLoading.value = false;
            })
        }

        return { isLoading, pageStepper, updatePageStepper, riderTypes, riderDetails, submitHandler }
    }
});

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