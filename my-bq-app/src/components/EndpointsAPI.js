import axios from "axios";

const api = "https://firestore.googleapis.com/v1/projects/burgerqueen-a42b3/databases/(default)/documents/food/";

export const getFoodProducts = () =>
  axios.get(`${api}`).then((response) => response.data);

export const getFoodProductsTransform = async () => {
  const arrayFoodProducts = await getFoodProducts();
  const resultFoodProducts = [];
  const arrayFoodDocuments = arrayFoodProducts.documents;
  arrayFoodDocuments.forEach((e) => {
    const foodObject = {name:e.fields.name, price:e.fields.price, img:e.fields.img};
    resultFoodProducts.push(foodObject);
  })
  console.log(resultFoodProducts);
  return resultFoodProducts;
}

export const getFoodProduct = (foodName) =>
  axios.get(`${api}/food/${foodName}`).then((response) => response.data);

export const deleteFoodProduct = (foodName) => axios.delete(`${api}/food/${foodName}`);

export const updateFoodProduct = (foodName, price) =>
  axios.put(`${api}/food/${foodName}`, price);

export const updateFoodProductPatch = (foodName, price) =>
  axios.patch(`${api}/food/${foodName}`, price);