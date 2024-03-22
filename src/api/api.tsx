import axios from "axios";

export const fetchData = () => {
  return axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.data);
};

export const fetchCatData = () => {
  return axios.get("https://catfact.ninja/fact").then((res) => res.data);
};
