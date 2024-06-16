import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { DeleteProduct, getAdminProduct, getAllCategories, getAllProducts, getSingleProduct, getlatestProducts, newProduct, updateProduct } from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';
const app = express.Router();
// Create New Product   - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
//  Product with filter  - /api/v1/product/all
app.get("/all", getAllProducts);
// Create New Product   - /api/v1/product/latest
app.get("/latest", getlatestProducts);
// Create New Product   - /api/v1/product/categories
app.get("/categories", getAllCategories);
// Create New Product   - /api/v1/product/admin-product
app.get("/admin-product", adminOnly, getAdminProduct);
app.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, DeleteProduct);
export default app;
