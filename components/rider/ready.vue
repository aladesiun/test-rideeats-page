<template>
    <div class="container my-9">
        <div class="text-center w-full">
            <h1 class="md:text-[50px] text-2xl font-semibold text-center my-4">Getting you ready</h1>
            <p class="text-[#717176] text-[18px] mt-9">In this section, upload your documents to complete your registration.
            </p>
        </div>
        <div>
            <div class="lg:w-[700px] mx-auto my-9 ">

                <div class="flex justify-between items-center my-2 pt-4">
                    <p class="text-[#717176] ">Passport photograph*
                        <span class="text-blue-300 text-xs pl-5 block" v-if="riderFiles.passportPhoto?.name">
                            {{ riderFiles.passportPhoto?.name }}</span>
                    </p>

                    <label for="file[incorporation]" @click="handleFiles('passportPhoto')"
                        class="btn-upload flex-center-all text-xs md:text-sm py-4 px-5 overflow-x-auto max-w-[200px] w-[200px] bg-[#FFF3E5]">
                        {{ riderFiles.passportPhoto?.name
                            == '' ? 'Upload documents' : "Change Document"
                        }}
                    </label>
                </div>

                <div class="flex justify-between items-center my-2 pt-4">
                    <p class="text-[#717176] ">Driver's license*
                        <span class="text-blue-300 text-xs pl-5 block" v-if="riderFiles.driverLicense.name">
                            {{ riderFiles.driverLicense.name }}</span>
                    </p>

                    <label for="file[incorporation]" @click="handleFiles('driverLicense')"
                        class="btn-upload flex-center-all text-xs md:text-sm py-4 px-5 overflow-x-auto max-w-[200px] w-[200px] bg-[#FFF3E5]">
                        {{ riderFiles.driverLicense.name
                            == '' ? 'Upload documents' : "Change Document"
                        }}
                    </label>
                </div>
                <div class="flex justify-between items-center my-2 pt-4">
                    <p class="text-[#717176] ">Rider's permit (optional)
                        <span class="text-blue-300 text-xs pl-5 block" v-if="riderFiles.riderPermit.name">
                            {{ riderFiles.riderPermit.name }}</span>
                    </p>

                    <label for="file[incorporation]" @click="handleFiles('riderPermit')"
                        class="btn-upload flex-center-all text-xs md:text-sm py-4 px-5 overflow-x-auto max-w-[200px] w-[200px] bg-[#FFF3E5]">
                        {{ riderFiles.riderPermit.name
                            == '' ? 'Upload documents' : "Change Document"
                        }}
                    </label>
                </div>

                <div class="flex justify-between w-full pt-7">
                    <button type="button" @click="pageStepper--"
                        class="btn-transparent text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Previous</button>
                    <button @click="submitHandler()" type="button"
                     v-if="uploaded"
                        class="btn-filled text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue'
import UseHandleFiles from "~~/composables/files";

export default defineComponent({
    components: {},
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
    emits: ['pageStepper', "update:modelValue", "submit"],

    setup(props, { emit }) {
        const uploaded = ref(false);
        const { handleFiles, fileResponse } = UseHandleFiles();
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });
        const riderFiles = computed({ get: () => props.modelValue, set: (val) => emit("update:modelValue", val) });

        // check if the files are not empty also attach fileResponse to appropriate file
        watch(fileResponse, () => {
            console.log(fileResponse.value);
            console.log('ready',riderFiles.value);
            
            riderFiles.value[fileResponse.value.category] = fileResponse.value;
            
            if (riderFiles.value.passportPhoto.name != '' &&  riderFiles.value.driverLicense.name != '') {
                uploaded.value = true;
                console.log(fileResponse);
                
            }
        }, { deep: true });

        const submitHandler = ()=>{
            pageStepper.value ++;
            emit("submit");
        }

        return { pageStepper, handleFiles, riderFiles, uploaded, submitHandler }
    },

})
</script>