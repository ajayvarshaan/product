import Product from "../models/Product.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, user: req.user });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error creating product" });
  }
};

// @desc    Get all products (with optional search)
// @route   GET /api/products?keyword=...
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Check ownership
      if (product.user.toString() !== req.user) {
        return res.status(401).json({ message: "Not authorized to edit this product" });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating product" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership
    if (product.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newReview = { ...req.body, user: req.user };
    product.reviews.push(newReview);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error adding review" });
  }
};