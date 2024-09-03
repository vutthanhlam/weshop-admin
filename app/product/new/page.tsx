import { Container } from "react-bootstrap";
import { CustomURL } from "@/app/lib/definitions";
import Link from "next/link";
import CreateProductForm from "@/app/ui/products/create-form";

export default function Page() {
  const urls = [
    {
      title: "Product",
      url: "/products",
      active: false,
    },
    {
      title: "New product",
      url: "/product/new",
      active: true,
    },
  ];
  return (
    <Container className="py-3">
      <Container className="px-0 d-flex">
        <h3>
          <Link
            href="/products"
            style={{ color: "black", textDecoration: "none" }}>
            Product
          </Link>{" "}
          {"/ "}
          <span className="text-muted">New product</span>
        </h3>
      </Container>
      <Container className="px-0 my-3 rounded border bg-custom-color">
        <CreateProductForm />
      </Container>
    </Container>
  );
}
