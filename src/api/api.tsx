import axios from "axios";

export const fetchData = () => {
  return axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => res.data);
};
