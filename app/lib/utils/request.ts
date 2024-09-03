import cloudinary from "../cloudinary";
export const graphqlRequest = async (payload, option = {}) => {
  console.log(payload);
  const res = await fetch(`http://localhost:4000/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bear ${localStorage.getItem("accessToken")}`,
      ...option,
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  console.log(data);
  return data;
};

export async function uploadImage2Cloudinary(image: any) {
  try {
    const createImage = async (img: any) => {
      const uploadedImageResponse = await cloudinary.uploader.upload(
        img,
        "products",
        { resource_type: "image" }
      );
      return uploadedImageResponse;
    };
    const createdImage = await createImage(image);
    console.log(createdImage);
    return createdImage;
  } catch (error) {
    console.log(error);
  }
}
