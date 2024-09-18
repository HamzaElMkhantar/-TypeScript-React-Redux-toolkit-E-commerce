import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";

const lottieFileMap = {
  loading,
  error,
  empty,
  notFound,
};
type TLottieHandlerProps = {
  type: keyof typeof lottieFileMap;
  message?: string;
  className?: string;
};
const LottieHandler = ({ type, message, className }: TLottieHandlerProps) => {
  const lottieFile = lottieFileMap[type];
  const messageStyle =
    type === "error"
      ? { color:'red', marginBottom: "-30px" }
      : {};
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie
        animationData={lottieFile}
        style={{ width: "300px", marginBottom: "30px" }}
      />
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default LottieHandler;
