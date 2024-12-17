import React from "react";

const CustomizedDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={9}
      fill="#c7c4bf"
      stroke="white"
      strokeWidth={2}
    />
  );
};

export default CustomizedDot;
