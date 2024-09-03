"use client";
import { Button } from "react-bootstrap";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteProduct } from "@/app/lib/utils/productUtils";

export function RemoveProductBotton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [show, setShow] = useState<boolean>(false);

  function handleOpen() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleDelete() {
    deleteProduct(id);
  }

  return (
    <>
      <Button onClick={handleOpen} variant="danger" className="mx-1">
        <TrashIcon style={{ height: "24" }} />
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Server message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to remove product <strong>{name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
