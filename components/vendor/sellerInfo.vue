<template>
    <div class="min-h-[75vh]">
        <div class="text-center w-full">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4">Seller Information</h1>
            <p class="text-[#717176] text-sm">In this section, provide your basic information to complete the
                registration.</p>
        </div>
        <div>
            <Form class="lg:w-[700px] mx-auto my-9 " @submit="validateSellerInfo">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <Field :rules="validateFields" name="First name" required type="text"
                            class="reg-input before-el px-9 mt-7" v-model="sellerInfo.firstName"
                            placeholder=" First name" />
                        <ErrorMessage name="First name" class="text-[#F46F2A] text-xs text-left block pr-5 py-2" />
                    </div>

                    <div>
                        <Field :rules="validateFields" name="Last name" required type="text"
                            class="reg-input before-el px-9 mt-7" v-model="sellerInfo.lastName"
                            placeholder="Last Name" />
                        <ErrorMessage name="Last name" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                    </div>
                </div>
                <Field :rules="validateFields" name="phone" required type="number" class="reg-input before-el px-9 mt-7"
                    v-model="sellerInfo.phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                <div class="flex justify-between items-center  w-full mx-auto mt-9">
                    <button type="button" @click="pageStepper--" v-show="pageStepper > 1"
                        class="btn-transparent text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Previous</button>
                    <button type="submit" v-show="pageStepper < 4"
                        class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Submit</button>
                </div>
            </Form>
        </div>
    </div>
</template> 
<script lang="ts">
import Default from "../../components/forms/default.vue";
import { computed, defineComponent, ref } from "vue";
import { PropType } from "vue/types/v3-component-props";
import { SellerInfoType } from "~/models";
import { Field, Form, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: { Default, Field, Form, ErrorMessage },
    props: {
        sellerInfo: {
            type: Object as PropType<SellerInfoType>,
            required: true,
        },
        pageStepper: {
            type: Number,
            required: true
        }
    },
    setup(props, { emit }) {
        const toggleCheck = ref(false);
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });

        const validateSellerInfo = () => {
            pageStepper.value = 3;
            return false;
        }

        const validateFields = (value: string) => {
            if (!value) {
                return 'This field is required';
            } else {
                return true;

            }
        }
        const sellerInfo = computed(() => props.sellerInfo);
        return { sellerInfo, toggleCheck, validateSellerInfo, validateFields, pageStepper }
    }
})

</script>


