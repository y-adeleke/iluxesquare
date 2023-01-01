import { useState } from "react";

const Inputnumber = (props) => {
  return (
    <input
      className="code-input"
      type="number"
      value={props.value}
      onChange={props.handleNum}
    />
  );
};

export default Inputnumber;
