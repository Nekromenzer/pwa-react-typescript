import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Parallel from "./parallelSerial/Parallel";
import Serial from "./parallelSerial/serial";

const ParallelSerial = () => {
  const [type, setType] = useState("serial");
  return (
    <Wrapper header="Parallel & Serial (disabled cache)">
      <br />
      <button
        onClick={() => setType("parallel")}
        style={{ background: type === "parallel" ? "#5468ff" : "" }}
      >
        Parallel
      </button>
      <button
        onClick={() => setType("serial")}
        style={{ background: type === "serial" ? "#5468ff" : "" }}
      >
        Serial
      </button>
      <br />
      {type === "serial" ? <Serial /> : <Parallel />}
    </Wrapper>
  );
};

export default ParallelSerial;
