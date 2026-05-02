import axios from "axios";
import { toast } from "react-toastify";
import { auth_token_key } from "./apiUrls";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        withCredentials: true,
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(auth_token_key)}`,
          ...(body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
        },
      });

      if (method !== "GET" && result?.data?.status != 204) {
        if (result?.data?.status == 200) {
          toast.success(result?.data?.message);
        } else {
          toast.error(result?.data?.message);
        }
      }

      return { data: result.data };
    } catch (axiosError) {
      
      const error = axiosError;

      if(error.response?.status == 401){
        localStorage.removeItem(auth_token_key);
        window.location.href = '/login';
      }

      if (Array.isArray(error.response?.data?.message)) {
        toast.error(error.response?.data?.message[0]);
      } else {
        toast.error(error.response?.data?.message || "An error occurred!");
      }

      console.log("error", error.response?.status);

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
