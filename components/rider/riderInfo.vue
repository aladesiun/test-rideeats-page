<template>
    <div>
        <div class="text-center lg:w-[800px] w-[80%] mx-auto mb-9">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4 leading-10">Area of operation</h1>
            <p class="text-[#717176] text-sm">List your business online by submiting your details in the form below.</p>
        </div>

        <div class="">
            <div class="mt-9 grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div class="reg-input-2 before-el px-9 py-2">
                    <MultiSelect id="sites" :multiple="false" @remove="onRemoveHandler"
                        :options="states[0].map((item) => ({ name: item.title }))" aria-autocomplete="none" track-by="value"
                        label="name" placeholder="Select State" v-model="address.city" />
                </div>

                <div class="reg-input-2 before-el px-9">
                    <MultiSelect id="sites" :multiple="false" @remove="onRemoveHandler" :options="address.city != null ? towns.map((town)=>{return{name:town.title, id:town.id}}) : []"
                        track-by="value" label="name" placeholder="Select Local" v-model="address.town" :disabled="address.city == null" />
                </div>

            </div>
            <div class="reg-input-2 before-el px-9 mt-4">
                <MultiSelect  :multiple="true" :options="areas.length < 1 ? [] : areas[0].map((area)=> {return {name: area.title, value: area.id}})"
                    track-by="value" label="name" placeholder="Select Area" v-model="address.area"  :disabled="address.town == null" />
            </div>
        </div>

        <div class="flex justify-between items-center  w-full mx-auto">
            <button type="button" @click="validateBusinessInfo()" v-if="pageStepper != 3 && address.area.length > 0"
                class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Next</button>
        </div>
    </div>
</template>
<script lang="ts">
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { BusinessInfoType, Address, AreasType, AreaType, Town } from "../../models/index";
import statesAndLgas from '~/config/data/locals.json'
import MultiSelect from "vue-multiselect"


import { defineComponent } from 'vue'
import { Ref } from '@nuxtjs/composition-api';

export default defineComponent({
    props: {
        pageStepper: {
            type: Number,
            required: true
        },
        modelValue: {
            type: Object,
            required: true
        }
    },
    components: {
        VueSelect, MultiSelect,
    },
    emits: ["update:modelValue", 'pageStepper'],
    async setup(props, { emit }) {
        const runtimeConfig = useRuntimeConfig()

        // fetch locations
        const { data } = await useFetch(runtimeConfig.public.APP_BASE_URL + 'operations/areas');
        const defaultAreas = ref(data ?? []) as Ref<AreasType[]>;
        const states = defaultAreas.value.map((item) => item.states);
        const towns = ref([]) as Ref<Town[]>;
        const areas = ref([]) as Ref<AreaType[]>;

        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });
        const addressInfo = computed({
            get: () => props.modelValue as Address,
            set: (val) => emit("update:modelValue", val)
        });

        const address = reactive({
            city: null,
            town: null,
            area: [],
        });


        const onRemoveHandler = () => {
            if (address.city == null) {
                address.town = null;
            }
            if (address.town == null) {
                address.area = [];
            }
        }

        const validateBusinessInfo = () => {
            addressInfo.value = {
                city: address.city?.name,
                town: address.town?.name,
                area: address.area.map((e) => e.name),
            };
            if(addressInfo.value.city == null || addressInfo.value.town == null || addressInfo.value.area.length < 1){
                return;
            } 
            pageStepper.value++
            return false;
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
            states,
            areas,
            towns,
            defaultAreas,
            address, pageStepper, onRemoveHandler, validateBusinessInfo
        }
    },
})
</script>
<style scoped>
.transparent {
    border: 0px !important;
    background: white;
    border-color: white !important;
}

.vs__search {
    background: white;
}
</style>
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
}
</style>