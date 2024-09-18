import { isString } from "@customTypes/guards";
import axios from "axios";

const handleAxiosError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    return e.response?.data.message || e.message;
  }
  return "An error occurred while processing the request";
};

export default handleAxiosError;


// Error handling utility function
export const handleError = (payload: unknown): string => {
  if (isString(payload)) {
    return payload;
  }
  return "An unexpected error occurred";
};
