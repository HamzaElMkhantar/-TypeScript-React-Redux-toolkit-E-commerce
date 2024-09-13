import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2
      className="py-1 px-3"
      style={{
        fontSize: "15px",
        backgroundColor: "#2b3035",
        color: "#EFEFEF",
        borderTop: "1px solid lightGray",
        marginBottom: "40px",
      }}
    >
      {children}
    </h2>
  );
};

export default Heading;
