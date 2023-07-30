<template>
    <div class="min-h-[75vh]">
        <div class="text-center w-full">
            <h1 class="md:text-[50px] text-2xl leading-[60px] font-semibold text-center my-4">Setting up your business is
                <br /> simple
            </h1>
            <p class="text-[#717176] text-[18px] mt-9">In this section, upload your documents to complete your
                registration.</p>
        </div>
        <div>
            <Form class="lg:w-[700px] mx-auto my-9 " encType="multipart/form-data" @submit="validateDocs">

                <!-- first document -->
                <div>
                    <div class="flex justify-between items-center pt-4">
                        <p class="text-[#717176] ">
                            Certificate of Incorporation (PDF Format)
                            <span class="text-blue-300 text-xs pl-5 block" v-if="documentInfo.incorporation?.name">
                            {{documentInfo.incorporation?.name }}</span>
                        </p>

                        <label for="file[incorporation]" @click="handleFiles('incorporation')"
                            class="btn-upload flex-center-all text-xs md:text-sm py-4 px-5 overflow-x-auto max-w-[200px] w-[200px] bg-[#FFF3E5]">
                            {{documentInfo.incorporation?.name
                                == '' ? 'Upload documents' : "Change Document"
                            }}
                        </label>
                    </div>
                    <ErrorMessage name="incoporation" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                </div>

                <!-- Second document -->
                <div>
                    <div class="flex justify-between items-center pt-4">
                        <p class="text-[#717176] ">
                            ID card of the Business owner (jpeg or PDF Format)
                            <span class="text-blue-300 text-xs pl-5 block" v-if="documentInfo.idCard.name">
                            {{
                                documentInfo.idCard.name }} </span>
                        </p>
                        <label for="file[idCard]" @click="handleFiles('idCard')"
                            class="btn-upload flex-center-all text-xs md:text-sm py-4 px-5 overflow-x-auto max-w-[200px] w-[200px] bg-[#FFF3E5]">
                            {{ documentInfo.idCard.name == '' ? 'Upload documents' : "change Document" }}
                        </label>
                    </div>
                    <ErrorMessage name="idCard" class="text-[#F46F2A] text-xs text-right block pr-5 py-2" />
                </div>
 
                <!-- Loading and submit btns -->
                <p v-if="loading" class="text-xs text-[#F46F2A]">uploading.....</p>
                <div class="flex justify-between items-center  w-full mx-auto mt-9">
                    <button type="button" @click="pageStepper--"
                        class="btn-transparent text-lg py-3 w-[100px]  my-4 md:mb-[20px]  text-center">Previous</button>
                    <button type="submit" v-if="uploaded"
                        class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Submit</button>
                    <button type="button" v-if="uploadError" @click="handleFiles"
                        class="btn-filled text-lg py-3 w-[100px] block ml-auto  my-4 md:mb-[20px]  text-center">Try
                        again</button>
                </div>
            </Form>

        </div>
    </div>
</template>
<script lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { computed, defineComponent, ref } from "vue";
import { PropType } from "vue/types/v3-component-props";
import UseHandleFiles from "~~/composables/files";
import { VendorDocType } from "~~/models";
import { useNotificationStore } from '../../store/notification'

export default defineComponent({
    components: { Form, Field, ErrorMessage },
    props: {
        documentInfo: {
            type: Object as PropType<VendorDocType>,
            required: true,
        },
        pageStepper: {
            type: Number,
            required: true
        },
        registerVendor: {
            type: Function,
            required: true
        }
    },
    emits: ["update:modelValue", "EmitRegisterVendor", "pageStepper"],
    setup(props, { emit }) {
        const documentInfo = computed({get: () => props.documentInfo, set: (val)=> emit("update:modelValue")});
        
        const store = useNotificationStore();
        const loading = ref(false);
        const uploaded = ref(false);
        const uploadError = ref(false);
        // const documentInfo = ref({ incorporation: { name: '' }, idCard: { name: '' }});
        const pageStepper = computed({ get: () => props.pageStepper, set: (val) => emit("pageStepper", val) });
        
        const { handleFiles, fileResponse } = UseHandleFiles(); 
       
        // submit docs finally
        const validateDocs = () => {
            emit("EmitRegisterVendor");
            return false;
        }
        
        // validate docs fields
        const validateFields = (value: string) => {
            if (!value) {
                return 'This field is required';
            } else {
                return true;
            }
        }
        // check if the files are not empty also attach fileResponse to appropriate file
        watch(fileResponse, () => {
            documentInfo.value[fileResponse.value.category] = fileResponse.value;
            if (documentInfo.value.idCard.name != '' && documentInfo.value.incorporation.name != '') {
                uploaded.value= true;
            }
        }, { deep: true });


        
        return { uploadError, handleFiles, documentInfo, loading, validateDocs, validateFields, pageStepper, uploaded }
    }
})
</script>
