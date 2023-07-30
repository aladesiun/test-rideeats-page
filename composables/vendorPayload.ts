import { defineComponent, reactive, ref, watch } from "vue";
import { VendorDetailsType } from '~/models/index';

export const UseVendorPayload = (vendorDetails:VendorDetailsType)=>{
  const payLoad = ref({});

  const processPayload =()=> {
    payLoad.value = {
      businessInfo: {
        address: vendorDetails.businessInfo.address.address,
        town: vendorDetails.businessInfo.address.town,
        area: vendorDetails.businessInfo.address.area,
        country: "Nigeria",
        state: vendorDetails.businessInfo.address.city,
        email: vendorDetails.businessInfo.contact.email,
        phone: vendorDetails.businessInfo.contact.phone,
        store_name: vendorDetails.businessInfo.contact.storeName,
      },
      sellerInfo: {
        firstname: vendorDetails.sellerInfo.firstName,
        lastname: vendorDetails.sellerInfo.lastName,
        phone: vendorDetails.sellerInfo.phone
      },
      brand_types: vendorDetails.brandType,
      business_types: vendorDetails.businessInfo.businessType,
      docs: {
        incorporation: vendorDetails.docs.incorporation,
        idCard: vendorDetails.docs.idCard,
      }
    }
    console.log(payLoad.value);
    
  }
   
    return { payLoad, processPayload}
}