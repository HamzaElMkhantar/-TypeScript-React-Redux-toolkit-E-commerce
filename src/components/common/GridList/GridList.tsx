import { Col, Row } from "react-bootstrap";
import { TGridListProps } from "src/types/shared";

type THasId = { id: number };
const GridList = <T extends THasId>({ records, render }: TGridListProps<T>) => {
  const recordsList =
    records.length > 0
      ? records.map((record) => {
          return (
            <Col
              key={record.id}
              xs={6}
              md={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              {render(record)}
            </Col>
          );
        })
      : " there are no items available";
  return <Row>{recordsList}</Row>;
};

export default GridList;
