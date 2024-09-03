"use client";
import { createProduct } from "@/app/lib/actions";
import { ProductBasicInfo, Variation } from "@/app/lib/definitions";
import { createNewProduct } from "@/app/lib/utils/productUtils";
// import { testGraphQL } from "@/app/lib/utils/productUtils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { read } from "fs";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const colors = ["Black", "White", "Gray", "Red", "Yellow", "Blue"];
const categories = ["Phone", "Laptop", "Camera", "TV", "Accessory"];
export default function CreateProductForm() {
  const [variations, setVariations] = useState<[Variation]>([
    {
      color: "Black",
      files: [],
      available: 0,
    },
  ]);
  const [productInfo, setProductInfo] = useState<ProductBasicInfo>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  function handleBasicInfoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  }

  async function handleSubmit() {
    // e.preventDefault();
    let formData = new FormData();
    const { name, description, price, category } = productInfo;
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("variations", JSON.stringify(variations));
    createNewProduct(formData);
  }

  function addNewVariation() {
    setVariations((prev) => [
      ...prev,
      {
        color: "Black",
        files: [],
        available: 0,
      },
    ]);
  }

  function handleSelectColor(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    setVariations((prev) => {
      let newVariations = prev.map((item, i) => {
        if (i == idx) return { ...item, color: e?.target.value };
        return item;
      });
      return newVariations;
    });
  }

  function handleChangeAvaileble(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    setVariations((prev) => {
      let newVariations = prev.map((item, i) => {
        if (i == idx) return { ...item, available: e?.target.value };
        return item;
      });
      return newVariations;
    });
  }

  async function handleSelectFile(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const srcFiles = e.target.files;
    let files = [];
    for (let idx = 0; idx < srcFiles?.length; idx++) {
      console.log();
      const reader = new FileReader();
      reader.readAsDataURL(srcFiles[idx]);
      reader.addEventListener("load", () => {
        files.push(reader.result);
      });
    }
    setVariations((prev) => {
      const updatedVariations = prev.map((variation, i) => {
        if (i == idx)
          return {
            ...variation,
            files: files,
          };
        return variation;
      });
      return updatedVariations;
    });
  }

  function removeVariation(idx: number) {
    setVariations((prev) => {
      let newList = prev.filter((item, i) => {
        if (idx != i) return item;
      });
      if (newList.length == 0) {
        newList = [
          {
            color: "Black",
            files: [],
            available: 0,
          },
        ];
      }
      return newList;
    });
  }

  // useEffect(() => {
  //   const test = async () => {
  //     const test = await testGraphQL();
  //     console.log(test);
  //   };
  //   test();
  // }, []);

  // console.log("variations: ", variations);
  return (
    <Form action={handleSubmit} className="p-3">
      <Form.Group className="mb-3">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          placeholder="A new product..."
          value={productInfo.name}
          onChange={handleBasicInfoChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product's description</Form.Label>
        <Form.Control
          as="textarea"
          required
          name="description"
          rows={3}
          value={productInfo.description}
          onChange={handleBasicInfoChange}
        />
      </Form.Group>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Select the product's category</Form.Label>
            <Form.Select
              required
              name="category"
              aria-label={`Select category`}
              value={productInfo.category}
              onChange={handleBasicInfoChange}>
              <option>Please select the category</option>
              {categories.map((category) => (
                <option value={category} key={`category-${category}`}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              required
              name="price"
              value={productInfo.price}
              onChange={handleBasicInfoChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <div className="d-flex justify-content-between">
          <Form.Label>Variations</Form.Label>
          <Button variant="success" onClick={addNewVariation}>
            Add new variation <PlusIcon style={{ height: "24" }} />
          </Button>
        </div>

        {variations.map((item, idx) => {
          return (
            <Container
              key={`variation ${idx}`}
              className="border pb-2 mt-2 rounded shadow-lg">
              <div className="d-flex justify-content-between pt-2 align-items-end">
                <p className="text-muted fw-medium">Variation {idx + 1}</p>

                <TrashIcon
                  style={{ height: "24" }}
                  onClick={() => removeVariation(idx)}
                  //   style={{color:"red"}}
                />
              </div>
              <Row>
                <Col md={12} lg={4} className="pb-3">
                  <Form.Label>Select the color</Form.Label>
                  <Form.Select
                    required
                    aria-label={`Select color for variation ${idx + 1}`}
                    value={item.color}
                    onChange={(e) => handleSelectColor(e, idx)}
                    name={`variation-color-${idx}`}>
                    {colors.map((color) => (
                      <option value={color} key={`variation-${idx}-${color}`}>
                        {color}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6} lg={4} className="pb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>In stock</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={item.available}
                      onChange={(e) => handleChangeAvaileble(e, idx)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} lg={4} className="pb-3">
                  <Form.Label>Choose image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name={`file-${idx}`}
                    accept=".jpg, .png, .jpeg"
                    multiple
                    onChange={(e) => handleSelectFile(e, idx)}
                  />
                </Col>
              </Row>
            </Container>
          );
        })}
      </Form.Group>
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Button variant="outline-primary" href="/product/new">
            Clear the form
          </Button>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Button type="submit">Save product</Button>
        </Col>
      </Row>
    </Form>
  );
}
