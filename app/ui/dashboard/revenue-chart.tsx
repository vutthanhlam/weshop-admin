// import { fetchRevenue } from "@/app/lib/data";
import { Container } from "react-bootstrap";

export default async function RevenueChart() {
  // const revenue = await fetchRevenue();
  const height = 350;

  return (
    <div
      style={{ height: `${height}px` }}
      className="bg-custom-color border d-flex rounded">
      <Container className="m-3 bg-white rounded">chart</Container>
    </div>
  );
}
