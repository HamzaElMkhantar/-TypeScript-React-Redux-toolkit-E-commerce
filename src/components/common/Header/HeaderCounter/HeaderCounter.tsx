import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type THeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  pathLink: string;
};
const { container, totalNum, pumpAnimate } = styles;

const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  pathLink,
}: THeaderCounterProps) => {
  const [animated, setAnimated] = useState<boolean>(false);
  const quantityStyle = `${totalNum} ${animated ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantity) return;
    setAnimated(true);

    const debounce = setTimeout(() => {
      setAnimated(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div style={{ marginLeft: "15px" }}>
      <Link
        to={"/" + pathLink}
        className={container}
        style={pathLink === "cart" ? { border: "0" } : {}}
      >
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </Link>
      {pathLink}
    </div>
  );
};

export default HeaderCounter;
