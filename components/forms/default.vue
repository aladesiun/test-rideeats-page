<template>
    <input :type="inputDetails.type" class="reg-input before-el px-9 mb-7" :placeholder="inputDetails.placeholder" />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { PropType } from 'vue/types/v3-component-props'
import { InputDetails } from '../../models/index'
export default defineComponent({
    name:'default',
    props:{
        inputDetails :{
            type: Object as PropType<InputDetails>,
            required: true
        }
    },
    setup(props) {
        const inputDetails = computed(()=> props.inputDetails);
        return {inputDetails}
    },
})
</script>
 