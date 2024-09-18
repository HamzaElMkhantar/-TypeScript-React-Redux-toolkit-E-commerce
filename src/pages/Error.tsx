import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function Error() {
  return (
    <Container
      className={"notFound"}
      style={{ display: "flex", height: "100vh", alignItems: "center" }}
    >
      <LottieHandler type="notFound" />

      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
}

export default Error;
