import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" });

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Please consult the vidoe for an explanation why the below code cannot be used and the following code is used instead
  //   getAll() {
  //     return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  //   }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
