import React, { useState } from "react";
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import app from "../../../firebaseConfig";
import EditProductMobile from "./EditProductMobile";
import EditProductLg from "./EditProductLg";

function EditProduct({ handleEditFalse, product }) {
  // states for input fields
  const [name, setName] = useState(product.Name);
  const [category, setCategory] = useState(product.Category);
  const [stock, setStock] = useState(product.Stock);
  const [size, setSize] = useState(product.Size);
  const [buyPrice, setBuyPrice] = useState(product.BuyPrice);
  const [price, setPrice] = useState(product.Price);
  const [image, setImage] = useState(product.Image);
  const [description, setDescription] = useState(product.Description);
  const [keywords, setKeywords] = useState([]);

  const productObj = {
    name,
    category,
    stock,
    size,
    buyPrice,
    price,
    image,
    description,
    keywords,
  };

  const productFxns = {
    updateName: (value) => setName(value),
    updateCategory: (value) => setCategory(value),
    updateStock: (value) => setStock(value),
    updateSize: (value) => setSize(value),
    updateBuyPrice: (value) => setBuyPrice(value),
    updatePrice: (value) => setPrice(value),
    updateImage: (value) => setImage(value),
    updateDescription: (value) => setDescription(value),
    updateKeywords: (value) => setKeywords(value),
  };

  // Clear input fields
  const clearInputFields = () => {
    setName("");
    setCategory("");
    setStock("");
    setSize("");
    setBuyPrice("");
    setPrice("");
    setImage("");
    setDescription("");
    setKeywords([]);
  };

  // Update the product details
  const handleApplyChanges = async () => {
    const fieldsToUpdate = {
      Name: name,
      Category: category,
      Stock: stock,
      Size: size,
      BuyPrice: parseFloat(buyPrice),
      Price: parseFloat(price),
      Image: image,
      Description: description,
      Keywords: keywords,
    };

    try {
      const db = getFirestore(app);
      // Update the product in Firestore
      await updateDoc(doc(db, "Products", product.id), fieldsToUpdate);

      // Handle success (e.g., display a success message or navigate back)
      console.log("Product updated successfully!");

      // Clear input fields
      // clearInputFields();
      // Call handleEditFalse if needed
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <EditProductMobile product={productObj} productFxns={productFxns} handleApplyChanges={handleApplyChanges} />
      <EditProductLg product={productObj} productFxns={productFxns} handleApplyChanges={handleApplyChanges} />
    </>
  );
}

export default EditProduct;
