<template>
    <div class="container pt-9 pb-20 px-4 relative  md:mt-[160px] sm:block hidden ">
        <div>
            <p class="text-[#162D4F] font-bold text-[30px]">Subscribe to our newsletter</p>
            <p class="lg:w-[500px] w-full text-[#717176]  my-7">Browse local restaurants and businesses for delivery by entering your address below.
            </p>
            <form class="sm:flex block">
                <input type="email"
                    class="focus:outline-none focus:border-[#F46F2A] focus:border-2 rounded-[10px] sm:rounded-[20px] p-4 border border-3 border-[#FEF1EA] mr-2  xl:w-[500px]  lg:w-auto sm:max-w-[300px] w-full placeholder:text-sm placeholder:tex-[#E5E5E5]"
                    placeholder="Enter your email address" />
                    <button type="submit"
                    class="btn-filled outline-none sm:my-0 my-2  rounded-[10px] sm:rounded-[20px] text-sm p-4 sm:max-w-[100px] max-w-[100%] w-full min-w-[100px]">Subscribe</button>
            </form>
        </div>
        <div>
            <img src="~/assets/images/heroWPhone.png"
                class="hidden lg:block absolute  !bottom-[0px] lg:w-[800px] w-[600px] !-right-[80px] z-10" />
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
    name: "IndexPage",
    components: { NavHeader, DownloadApp }
})
</script>
  