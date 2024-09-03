"use server";
import { revalidatePath } from "next/cache";
import { uploadImage2Cloudinary } from "./request";
import { graphqlRequest } from "./request";
import { redirect } from "next/navigation";
import { Variation } from "../definitions";

export async function testGraphQL() {
  const query = `query Test {
                        test {
                            name
                        }
                        }`;
  const data = await graphqlRequest({ query });
  return data;
}

export async function createNewProduct(formData: FormData) {
  let variations = JSON.parse(formData.get("variations"));
  formData.delete("variations");
  console.log(formData);

  const uploadingImgVariations = await variations.map(
    async (variation: Variation) => {
      const uploadingImgs = variation.files.map(async (img) => {
        const uploadedImg = await uploadImage2Cloudinary(img);
        console.log(uploadedImg);
        return uploadedImg.secure_url;
      });
      const imgsUrl = await Promise.all(uploadingImgs);

      return {
        color: variation.color,
        available: parseInt(variation.available),
        img_urls: imgsUrl,
      };
    }
  );
  variations = await Promise.all(uploadingImgVariations);
  console.log(formData);
  const variables = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    category: formData.get("category"),
    variations: JSON.stringify(variations),
  };

  const query = `mutation Mutation($name: String!, $description: String!, $price: Float!, $category: String!, $variations: String!) {
    createProduct(name: $name, description: $description, price: $price, category: $category, variations: $variations) {
      id
    }
  }`;
  try {
    const data = await graphqlRequest({
      query,
      variables: variables,
    });
    if (data) {
      revalidatePath("/products");
      redirect("/products");
    } else throw new Error("Something went wrong!");
  } catch (error) {
    throw error;
  }
}

export async function getProducts() {
  const query = `query Query {
    products {
      name
      price
      sold
      rating {
        rate
        n_reviewers
      }
      variations {
        color
        img_urls
        available
      }
    }
  }`;
  try {
    const data = await graphqlRequest({ query });
    return { products: data.products };
  } catch (error) {
    // console.log("error: ", error);
    return { error: error };
  }
}

export async function deleteProduct(id: string) {
  const query = `mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
  `;
  try {
    const data = await graphqlRequest({ query, variables: { id: id } });
    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
    console.log(error);
  }
}
