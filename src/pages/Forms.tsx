import React from "react";
import Wrapper from "../components/Wrapper";

const Forms = () => {
  const [data, setData] = React.useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(data);
  };
  return (
    <Wrapper header="Here we demonstrate form action with tanstack online/offline">
      <br />
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
    </Wrapper>
  );
};

export default Forms;
