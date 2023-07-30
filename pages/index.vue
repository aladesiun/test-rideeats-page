<template>
    <div class="overflow-hidden">
        <Hero />
        <!-- Why you should use Rideeat -->
        <UseRideeat />
        <!--------Free Deliveries------->
        <FreeDeliveries />
        <!-- about us -->
        <AboutUs />
        <Subscribe/>
        
    </div>
</template>

<script lang="ts" >
import AboutUs from '~/components/landingPage/AboutUs.vue';
import Hero from '~/components/landingPage/Hero.vue';
import UseRideeat from '~/components/landingPage/UseRideeat.vue';
import { defineComponent} from 'vue'
import Subscribe from '~~/components/landingPage/Subscribe.vue'
import FreeDeliveries from '~~/components/landingPage/FreeDeliveries.vue';
export default defineComponent({
    name: "IndexPage",
    components: { Hero, AboutUs, UseRideeat, FreeDeliveries, Subscribe},
    setup() {
        return {}
    },

})
</script>
<style>
body{
    overflow-x: hidden;
}
</style>