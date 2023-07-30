<template>
    <div>hello guys</div>
    <Subscribe />
</template>

<script lang="ts">
import Subscribe from '~~/components/landingPage/Subscribe.vue';
import {
  defineComponent,
  ref,
  
} from 'vue'

export default defineComponent({
    name: "IndexPage",
    components: { Subscribe}
})
</script>
  