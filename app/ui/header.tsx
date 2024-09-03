"use client";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <div className="bg-danger text-white bg-gradient">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            S Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="text-white">
                Dashboard
              </Nav.Link>
              <Nav.Link href="/products" className="text-white">
                Products
              </Nav.Link>
              <Nav.Link href="/orders" className="text-white">
                Orders
              </Nav.Link>
              <Nav.Link href="/customers" className="text-white">
                Customers
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link type="button" className="text-white">
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
