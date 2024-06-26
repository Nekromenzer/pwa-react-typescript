import axios from "axios";

export const fetchData = () => {
  return axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.data);
};

export const fetchCatData = () => {
  return axios.get("https://catfact.ninja/fact").then((res) => res.data);
};

// pass signal to cancel the request
export const fetchDogData = async ({ signal }: any) => {
  return await axios
    .get("https://dog.ceo/api/breeds/image/random", { signal })
    .then((res) => res.data);
};
