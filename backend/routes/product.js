const express = require("express");
const {
  allProducts,
  detailProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.js");
const { authMid, roleChecked } = require("../middleware/auth.js");
const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", detailProducts);
router.get("/admin/products", authMid, roleChecked("admin"), allProducts);

router.post("/products/new", authMid, roleChecked("admin"), createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;
