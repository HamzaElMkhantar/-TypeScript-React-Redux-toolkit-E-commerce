import {memo} from "react";

const Heading = memo(({ children, title }: { children: React.ReactNode ,title?: string}) => {
  console.log("Heading")

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
      {children}{title &&`(${title})`}
    </h2>
  );
});

export default Heading;
