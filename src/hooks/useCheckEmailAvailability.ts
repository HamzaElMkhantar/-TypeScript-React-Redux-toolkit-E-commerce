import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  }
  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email)
    setEmailAvailabilityStatus("checking")
    try{
        const res = await axios.get(`/users?email=${email}`)
        if(!res.data.length){
            setEmailAvailabilityStatus("available");
        }else{
            setEmailAvailabilityStatus("notAvailable");
        }

    }catch(e){
        console.error("Error checking email availability:", e); 
        setEmailAvailabilityStatus("failed");
    }
  }

  return {
    emailAvailabilityStatus,
    enteredEmail,
     checkEmailAvailability,
     resetCheckEmailAvailability
  }
};

export default useCheckEmailAvailability;
