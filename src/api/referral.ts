import  { AxiosResponse } from "axios";
import apiClient from "api";


const getReferalLink = (email:string) : Promise<AxiosResponse>=>{
  return apiClient.get(`api/referral/${email}/link`)
}

const submitReferral = (email:string, referralCodeUsed:string) : Promise<AxiosResponse> => {
return apiClient.post(`api/referral/register`,{email, referralCodeUsed})
}

const getMyReferrals = (referralCode:string) : Promise<AxiosResponse> => {
  return apiClient.get(`api/referral/${referralCode}`)
}

export {submitReferral, getMyReferrals, getReferalLink}