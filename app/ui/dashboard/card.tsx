"use client";
import { Card, Col } from "react-bootstrap";
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function StatCard({
  name,
  value,
  type,
}: {
  name: string;
  value: string | number;
  type: "revenue" | "pending" | "shipping" | "delivered";
}) {
  const iconMap = {
    revenue: BanknotesIcon,
    pending: ClockIcon,
    shipping: TruckIcon,
    delivered: CheckCircleIcon,
  };

  const Icon = iconMap[type];

  return (
    <Col sm={12} md={6} lg={3} className="gy-3">
      <Card className="bg-custom-color">
        <Card.Body>
          <Card.Title className="d-flex align-items-center">
            <Icon style={{ height: "24", marginRight: "2px" }} /> {name}
          </Card.Title>
          <div
            className="d-flex  align-items-center justify-content-center rounded"
            style={{
              backgroundColor: "white",
              height: "100px",
            }}>
            <Card.Text className="text-center  fs-2"> {value}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
