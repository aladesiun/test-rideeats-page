import { computed, defineComponent, ref } from "vue";
import * as filestack from 'filestack-js';
const UseHandleFiles = () => {
    // initialize file picker
    const client = filestack.init('APC6a96aWQyK9cOfNGLoZz');
    const fileResponse = ref({})
    const handleFiles = (category:string) => {
        
        const options = {
            accept: ["image/jpeg","image/png","pdf"],
            
            fromSources: ["local_file_system", "googledrive", "dropbox"],
            transformations: {
                crop: false,
                circle: true,
                rotate: true
            },
            uploadConfig: {
                tags: {
                    "name": (file: any) => "vendor" + Date.now()
                }
            },
            onUploadDone: (file: any) => {
                fileResponse.value = {name:file.filesUploaded[0].filename, url:file.filesUploaded[0].url, category:category};
            },
            onFileUploadFailed:(error:any)=>{
                console.log(error);
                
            },
            

        };
        client.picker(options).open();
    };

    return {handleFiles, fileResponse}
};
export default UseHandleFiles;
