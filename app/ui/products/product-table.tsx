import { Col, Row, Container, Image, Button } from "react-bootstrap";
// import { RemoveProductBotton } from "../ui/products/buttons";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RemoveProductBotton } from "./buttons";
import { ProductImage, VariationImage } from "./images";
import { Product, Variation } from "@/app/lib/definitions";

export default function ProductsTable(props) {
  const products = props.products;
  console.log(products[0].variations[0].img_urls[0]);

  function getTotalAvailable(product: Product) {
    const sum = product.variations.reduce((sum, v) => sum + v.available, 0);
    return sum;
  }

  if (products.length)
    return (
      <Container
        className="px-0 py-2 bg-custom-color border rounded overflow-auto"
        style={{ overflowX: "scroll" }}>
        <Row className="mx-2 " style={{ minWidth: "1200px" }}>
          <Col className="fw-bold text-center">Product</Col>
          <Col className="fw-bold text-center">Variation(s)</Col>
          {/* <Col className="fw-bold">Description</Col> */}
          <Col className="fw-bold text-center">Price</Col>
          <Col className="fw-bold text-center">Sold</Col>
          <Col className="fw-bold text-center">Available</Col>
          <Col className="fw-bold text-center">Action</Col>
        </Row>
        {products.map((item) => {
          return (
            <Row
              className="mx-2 py-2 bg-white d-flex align-items-center border-bottom"
              key={item.id}
              style={{ minWidth: "1200px" }}>
              <Col>{item.name}</Col>
              <Col className="text-center ">
                {item.variations.map((variation) => {
                  return <VariationImage img={variation} />;
                })}
              </Col>
              {/* <Col className="text-truncate" style={{ maxHeight: "400px" }}>
                {item.description}
              </Col> */}
              <Col className="text-center">${item.price}</Col>
              <Col className="text-center">{item.sold}</Col>
              <Col className="text-center">{getTotalAvailable(item)}</Col>
              <Col className="text-center">
                <Button
                  href={`product/${item.id}/edit`}
                  variant="success"
                  className="mx-1">
                  <PencilSquareIcon style={{ height: "24" }} />
                </Button>
                <RemoveProductBotton id={item.id} name={item.name} />
              </Col>
            </Row>
          );
        })}
      </Container>
    );
  return (
    <Container className="px-0 py-2  overflow-auto">
      <p className="text-muted">
        There's no product to show, please add new ones.
      </p>
    </Container>
  );
}
