<template>
    <div>
       <NavHeader/>
       <Notification/>
        <div class="">
            <NuxtPage />
        </div>
        <!-- <Subscribe/> -->
        <Footer/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Footer from '~~/components/landingPage/Footer.vue'
import Subscribe from '~~/components/landingPage/Subscribe.vue'
import Notification from '~~/components/Notification'

export default defineComponent({
  name: "IndexPage",
  components: {Footer, Subscribe, Notification }
})
</script>