<template>
    <div class=" my-9">
        <div class="text-center w-full">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4 leading-[3rem]">Cuisine / brand type of
                your business
            </h1>
            <p class="text-[#717176] text-sm mt-9">In this section, provide your basic information to complete the
                registration.</p>
        </div>
        <div>
            <div class="lg:w-[700px] mx-auto my-9 ">
                <div class="grid grid-cols-2">
                    <div v-for="brand in brandType" :key="brand.id" class="cursor-pointer">
                        <div class="flex items-center py-3 cursor-pointer">
                            <input type="checkbox" class="hidden" :id="brand.id" @change="handleTypes(brand.id)">
                            <label :for="brand.id" class="flex cursor-pointer">
                                <div
                                    :class="toggleCheck(brand.id).length > 0 ? 'h-[18px] w-[18px] rounded-[50%] border-2  border-[#FF8900]  hover:border-[#B8BCC6] flex-center-all' : 'h-[18px] w-[18px] rounded-[50%] border-2 border-[#B8BCC6] hover:border-[#FF8900] flex-center-all'">
                                    <i class=' hover:text-[#FF8900] text-xs fa-sharp fa-solid fa-check' :class="toggleCheck(brand.id).length > 0 ? 'text-[#FF8900]' : 'text-white'"></i>
                                </div>
                                <span class="ml-2 text-[#5F6167] text-sm capitalize"> {{ brand.title }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center  w-full mx-auto">
                    <button type="button" @click="pageStepper--"
                        class="btn-transparent text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Previous</button>
                    <button type="submit" v-if="selectedBrandType.length > 0" @click="pageStepper++"
                        class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { BusinessAndBrandType } from "~~/models";
export default defineComponent({
    components: {},
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
        brandType: {
            type: Array,
            required: true
        },
        pageStepper: {
            type: Number,
            required: true
        }
    },
    emits: ["update:modelValue", "submit", "pageStepper"],
    setup(props, { emit }) {

        // show the check icon on each toggled brandType by passing only the brandType selected into the returned array from toggleCheck
        const toggleCheck = (id: number) => {
            return selectedBrandType.value.filter((item) => item == id)
        }

        const selectedBrandType = computed({ get: () => props.modelValue, set: () => emit('update:modelValue') });
        const brandType: BusinessAndBrandType = computed(() => props.brandType);

        const handleTypes = (e: number) => {

            if(toggleCheck(e).length > 0){
                let index = selectedBrandType.value.indexOf(e);
                selectedBrandType.value.splice(index, 1);
            }else{
                selectedBrandType.value.push(e);
            }

        }
        
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });

        const validateBrandType = () => {
            pageStepper.value = 3;
            return false;
        }

        return { brandType, toggleCheck, validateBrandType, pageStepper, handleTypes, selectedBrandType }
    }
})
</script>
