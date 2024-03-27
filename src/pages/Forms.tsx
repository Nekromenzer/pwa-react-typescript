import React from "react";
import Wrapper from "../components/Wrapper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Forms = () => {
  const [data, setData] = React.useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitFormData = new FormData();
  submitFormData.append("access_key", "b77ea485-743c-4529-adf7-0feb79856a83");
  submitFormData.append("name", data.name);
  submitFormData.append("email", data.email);
  submitFormData.append("message", data.message);

  const handleSubmitApiCall: any = useMutation({
    mutationFn: (): any => {
      return axios.post("https://api.web3forms.com/submit", submitFormData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    },
  });

  const handleSubmit = () => {
    handleSubmitApiCall.mutate();
  };

  return (
    <Wrapper header="Here we demonstrate form action with tanstack online/offline">
      <br />
      {/* If the form submission is successful, the following message will be displayed */}
      {handleSubmitApiCall.isError ? (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          An error occurred: {handleSubmitApiCall.error.message}
        </div>
      ) : null}

      {/* If the form submission is successful, the following message will be displayed */}
      {handleSubmitApiCall.isSuccess ? (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
          }}
        >
          {handleSubmitApiCall?.data?.data?.message} <br />
        </div>
      ) : null}

      {handleSubmitApiCall.isPending ? (
        <div>Submitting...</div>
      ) : (
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" id="name" name="name" onChange={handleChange} />
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" id="email" name="email" onChange={handleChange} />
          <br />
          <label htmlFor="message">Message:</label>
          <br />
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Forms;
