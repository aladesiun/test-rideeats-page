<template>
    <div class="container my-9">
        <div class="text-center w-full">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4">Rider bio-data</h1>
            <p class="text-[#717176] text-sm">In this section, provide your basic information to complete the registration.
            </p>
        </div>
        <div>
            <Form @submit="validateContactInfo()">
                <div class="lg:w-[700px] mx-auto my-9 ">
                    <div class="reg-input-2 before-el px-9">
                        <MultiSelect id="sites" :multiple="false" :options="types"
                            track-by="id" label="title" placeholder="Select ride type"
                            v-model="contact.rider_type" />
                    </div>

                    <div class="grid grid-cols-2 gap-4 my-5"> 
                        <div class="">
                            <Field :rules="validateFields" name="firstname" type="text" required class="reg-input before-el px-9 mt-"
                                v-model="contact.firstname" :placeholder="'Firstname'" />
                            <ErrorMessage name="firstname" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                        </div>
                        
                        <div class="">
                            <Field :rules="validateFields" name="lastname" type="text" required class="reg-input before-el px-9 mt-"
                                v-model="contact.lastname" :placeholder="'Lastname'" />
                            <ErrorMessage name="lastname" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                        </div>
                    </div>

                    <div class="my-5">
                        <Field :rules="validateFields" name="phone" type="phone" required class="reg-input before-el px-9 mt-"
                            v-model="contact.phone" :placeholder="'Phone Number'" />
                        <ErrorMessage name="phone" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                    </div>

                    <div class="my-5">
                        <Field :rules="validateFields" name="email" type="email" required class="reg-input before-el px-9 mt-"
                            v-model="contact.email" :placeholder="'Email Address'" />
                        <ErrorMessage name="email" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                    </div>

                    <Field :rules="validateFields" name="address" type="text" required class="reg-input before-el px-9 mt-"
                        v-model="contact.address" :placeholder="'Residential Address'" />
                    <ErrorMessage name="address" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />


                    <div class="flex justify-between w-full mt-5">
                        <button type="button" @click="pageStepper--"
                            class="btn-transparent text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Previous</button>
                        <button type="submit"
                            class="btn-filled text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Next</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineComponent } from 'vue'
import MultiSelect from "vue-multiselect"

export default defineComponent({
    components: {Field, Form, ErrorMessage, MultiSelect},
    props: {
        pageStepper: {
            type: Number,
            required: true
        },
        types:{
            type: Array<any>,
            required: true
        },
        modelValue: {
            type: Object,
            required: true
        }
    },
    emits: ['pageStepper', "update:modelValue"],

    setup(props, { emit }) {
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });
        const contact = computed({ get: () => props.modelValue, set: (val) => emit("update:modelValue", val) });
        const types = computed(()=> props.types)

        const validateFields = (value: string) => {
            if (!value) {
                return 'This field is required';
            } else {
                return true;

            }
        }

        const validateContactInfo = ()=>{
            pageStepper.value++;
        }

        return { pageStepper, contact, types, validateFields, validateContactInfo }
    },

})
</script>