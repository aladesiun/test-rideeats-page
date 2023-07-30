<template>
    <div class="min-h-[75vh]">

        <div class="text-center lg:w-[800px] w-[80%] mx-auto">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4 lg:leading-[3rem]">Partner with us today &
                grow your business</h1>
            <p class="text-[#717176] text-sm">List your business online by submiting your details in the form below.
            </p>
        </div>
        <Form class="mx-auto mt-9 " @submit="(e) => validateBusinessInfo(e)" v-if="defaultAreas">
            <!-- BUSINESS FORMS -->
            <div class="mt-9 grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div class="reg-input-2 before-el  py-2">
                    <MultiSelect id="sites" :multiple="false" @remove="onRemoveHandler"
                        :options="states[0].map((item) => ({ name: item.title }))" aria-autocomplete="none" track-by="value"
                        label="name" placeholder="Select State" v-model="address.city" />
                </div>

                <div class="reg-input-2 before-el ">
                    <MultiSelect id="sites" :multiple="false" @remove="onRemoveHandler"
                        :options="address.city != null ? towns.map((town) => { return { name: town.title, id: town.id } }) : []"
                        track-by="value" label="name" placeholder="Select Local" v-model="address.town"
                        :disabled="address.city == null" />
                </div>

            </div>
            <div class="reg-input-2 before-el  mt-4">
                <MultiSelect id="sites" :multiple="false" @remove="onRemoveHandler"
                    :options="areas.length < 1 ? [] : areas[0].map((area) => ({ name: area.title }))" track-by="value"
                    label="name" placeholder="Select Area" v-model="address.area" :disabled="address.town == null" />
            </div>
            <div v-show="address.area">
                <Field :rules="validateFields" name="address" type="text" required class="reg-input before-el mt-4"
                    v-model="address.address" :placeholder="'Address where you operate in' + ' ' + address.area?.name" />

                <ErrorMessage name="address" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />

                <div class="reg-input before-el  my-5">
                    <select required class="w-full h-full rideeat-inp-active text-black border-0 outline-none"
                        @change="(e) => businessInfo.businessType.push(parseInt(e.target.value))">
                        <option selected class="text-gray-300" disabled>--Select your Type of business--</option>
                        <option v-for="business in businessTypes" :key="business.id" :value="business.id">{{
                            business.title
                        }}</option>
                    </select>
                </div>
                <Field :rules="validateFields" name="storeName" type="text" required class="reg-input before-el mt-2"
                    v-model="businessInfo.contact.storeName" placeholder="Store Name">
                </Field>
                <ErrorMessage name="storeName" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />

                <Field :rules="validateFields" name="BusinessEmail" type="email" required class="reg-input before-el mt-6"
                    v-model="businessInfo.contact.email" placeholder="Business Email Address">
                </Field>
                <ErrorMessage name="BusinessEmail" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />

                <Field :rules="validateFields" name="phone" min="10" type="number" required
                    class="reg-input before-el  mt-7" v-model="businessInfo.contact.phone" placeholder="Phone  Number">
                </Field>
                <ErrorMessage name="phone" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />



            </div>
            <button v-if="address.area" type="submit" v-show="pageStepper < 4"
                class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Next</button>
        </Form>
    </div>
</template> 
<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { computed, defineComponent, reactive, ref } from "vue";
import { PropType } from "vue/types/v3-component-props";
import { BusinessInfoType, Address, AreasType, AreaType, Town, State } from "../../models/index";
import statesAndLgas from '~/config/data/locals.json'
import MultiSelect from "vue-multiselect"
import { Ref } from '@nuxtjs/composition-api';



export default defineComponent({
    components: { VueGoogleAutocomplete, Form, Field, ErrorMessage, MultiSelect },
    props: {
        modelValue: {
            type: Object as PropType<BusinessInfoType>,
            required: true,
        },
        businessTypes: {
            type: Array,
            required: true
        },
        pageStepper: {
            type: Number,
            required: true
        }
    },
    emits: ["update:modelValue", "submit", "pageStepper"],

    async setup(props, { emit }) {
        const runtimeConfig = useRuntimeConfig()

        // fetch locations
        const { data: statesAndLga } = await useFetch(runtimeConfig.public.APP_BASE_URL + 'operations/areas');
        const defaultAreas = ref(statesAndLga ?? []) as Ref<AreasType[]>;
        const states = defaultAreas.value.map((item) => item.states);
        const towns = ref([]) as Ref<Town[]>;
        const areas = ref([]) as Ref<AreaType[]>;
        const businessInfo = computed({
            get: () => props.modelValue as BusinessInfoType,
            set: (val) => emit("update:modelValue", val)
        });
        const address = reactive({
            city: null,
            town: null,
            area: null,
            address: null
        });

        const onRemoveHandler = () => {
            if (address.city == null) {
                address.town = null;
            }
            if (address.town == null) {
                address.area = null;
            }
        }

        const businessTypes = computed(() => props.businessTypes);

        // form stepper
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });

        // move to next screen/form
        const validateBusinessInfo = (e: any) => {
            businessInfo.value.address = {
                city: address.city?.name,
                town: address.town?.name,
                area: address.area?.name,
                address: address.address
            };
            pageStepper.value = 2;
            return false;
        }

        // const statesAndLga = statesAndLgas;

        const validateFields = (value: string) => {
            if (!value) {
                return 'This field is required';
            } else {
                return true;

            }
        }
        watch(address, () => {
            if (address.city != null) {
                towns.value = defaultAreas.value
                    .map((item: AreasType) => item.states.filter((state: State) => state.title == address.city!.name)
                        .map((town: State) => town.towns))[0][0] as unknown as Town;
            }
            if (address.town != null) {
                areas.value = towns.value.map((town) => town.areas);

            }
        }, { deep: true })
        return {
            areas,
            towns,
            defaultAreas,
            address,
            businessInfo,
            states,
            onRemoveHandler,
            validateBusinessInfo,
            businessTypes,
            pageStepper,
            validateFields
        }
    }
})
</script>
<style scoped>
.pac-container {
    border: 1px solid;
}

select::after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 0;
    background-color: rgb(11, 2, 2);
    height: 2000px;
    width: 20px;

}

select {
    position: relative;
}</style>