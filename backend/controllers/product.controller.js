import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ success: true, data: allProducts });
  } catch (err) {
    console.log(`Server error ${err.message}`);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: `Bad Request. Please provide all fields`,
    });
  }

  try {
    const newProduct = await Product.create(product);
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error(`Error in create product: ${err.message}`);
    res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: `Invalid product id`,
    });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: `Product deleted` });
  } catch (err) {
    console.error(`Error ${err.message}`);
    res.status(500).json({ success: false, message: `Server Error` });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: `Invalid product id`,
    });
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error` });
  }
};
