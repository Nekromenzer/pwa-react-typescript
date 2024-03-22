import React from "react";
import Nav from "./Nav";

const Wrapper = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: string;
}) => {
  return (
    <div>
      <Nav />
      <h3>{header}</h3>
      {children}
    </div>
  );
};

export default Wrapper;
