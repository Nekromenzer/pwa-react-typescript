import React from "react";

const Section = ({
  loading,
  header,
  data,
  error,
}: {
  loading: boolean;
  header: string;
  error: any;
  data: any;
}) => {
  if (error) return <div>`An error has occurred: ${error.message}`</div>;
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h4 style={{ color: "#3406cc", marginBottom: "0" }}>{header}</h4>
      <p style={{ color: "#1f1f1f", margin: "0" }}>{data}</p>
    </div>
  );
};

export default Section;
