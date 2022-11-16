import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/apiResponce";


const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";
const V1 = "v1.0";
export const register = (name: string,email: string, password: string) => {

  return axios
    .post(`${BASE_URL}/${V1}/user`, {
      name:name,
      email:email,
      password:password,
    })
    .then((response: AxiosResponse<ApiResponse<any>>) => {
      return response.data.data;
    });
};
