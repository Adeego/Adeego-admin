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

  //Functions to handle input fields changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleBuyPriceChange = (e) => {
    setBuyPrice(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
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
      clearInputFields();
      // Call handleEditFalse if needed
      handleEditFalse();
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <EditProductMobile product={productObj} productFxns={productFxns} />
      <EditProductLg product={productObj} productFxns={productFxns} />
    </>
  );
}

export default EditProduct;
