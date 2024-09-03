import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import StatCard from "./ui/dashboard/card";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import RevenueChart from "./ui/dashboard/revenue-chart";

export default function Home() {
  return (
    <Container className="flex-grow-1">
      <Container className="px-0 py-3">
        <h3>Statistics</h3>
        <Row>
          <StatCard type="revenue" name="Revenue" value="$12343.34" />
          <StatCard type="pending" name="Pending" value="18" />
          <StatCard type="shipping" name="Shiping" value="10" />
          <StatCard type="delivered" name="Delivered" value="25" />
        </Row>
      </Container>
      <Container className="px-0 py-3">
        <h3>Recent Revenue</h3>
        <RevenueChart/>
      </Container>
    </Container>
  );
}
