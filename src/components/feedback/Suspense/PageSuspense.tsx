import React, { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspense = ({
  children,
  main = false,
}: {
  children: React.ReactNode;
  main?: boolean;
}) => {
  let renderFallBack = null;
  if (main) {
    renderFallBack = (
      <div
        style={{
          width: "100%",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h5 style={{ marginTop: "-20%" }}>"Loading, Please wait..</h5>
      </div>
    );
  } else {
    renderFallBack = (
      <LottieHandler type="loading" message="Loading, Please Wait.." />
    );
  }
  return <Suspense fallback={renderFallBack}>{children}</Suspense>;
};

export default PageSuspense;
