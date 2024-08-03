import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

// instance.defaults.baseURL = "https://jsonplaceholder.typicode.com";
// instance.defaults.headers.common["Authorization"] = "AUTH TOKEN";
instance.defaults.headers.post["Content-Type"] = "application/json";

// TODO: Uncomment interceptor logic if required

// instance.interceptors.request.use(
//   (request) => {
//     console.log(request);

//     return request;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     console.log(response);

//     return response;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default setupCache(instance);
