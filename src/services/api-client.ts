import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",

  // We can optionally add headers to our requests by using the headers property. We can add multiple headers by separating them with
  // commas. For example, we can add
  //
  //   headers: {
  //     "Content-type": "application/json",
  //     'api-key': 'my_API_KEY'
  //   },
});

// We can export the CanceledError class as a named object from axios to be able to use it in our application
export { CanceledError };
