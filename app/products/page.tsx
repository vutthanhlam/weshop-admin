import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { RemoveProductBotton } from "../ui/products/buttons";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import ProductsTable from "../ui/products/product-table";
import { getProducts } from "../lib/utils/productUtils";

export default async function Page() {
  const { error, products } = await getProducts();

  return (
    <Container>
      <Container className="px-0 pt-3 d-flex flex-row justify-content-between">
        <h3>Products</h3>
        <Button href="/product/new">
          Create product <PlusIcon style={{ height: "24" }} />
        </Button>
      </Container>

      <Container className="px-0 py-1 my-2">Filter form</Container>
      {products ? (
        <Suspense>
          <ProductsTable products={products} />
        </Suspense>
      ) : (
        <p>Can't find any products! Please try again or add a new product!</p>
      )}
    </Container>
  );
}
