import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeleton = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col
        key={idx}
        xs={6}
        md={3}
        className="d-flex justify-content-center mt-2"
      >
        <ContentLoader
          speed={2}
          width={250}
          height={250}
          viewBox="0 0 250 250"
          backgroundColor="#e3e3e3"
          foregroundColor="#ecebeb"
        >
          <circle cx="110" cy="90" r="90" />
          <rect x="80" y="190" rx="5" ry="5" width="60" height="8" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeleton}</Row>;
};

export default CategorySkeleton;
