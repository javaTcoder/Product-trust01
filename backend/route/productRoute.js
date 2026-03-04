const express  = require("express");
const router  = express.Router();

const { getAllProducts, updateProductDiscount,createProduct, updateProduct, deleteProduct, getProductDetails, getAllProductsAdmin} = require("../controller/productController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const upload = require("../utils/upload");

 
 

router.route("/product").get(getAllProducts)
router.route("/admin/product/new").post(isAuthentictedUser, authorizeRoles("admin"), upload.array("images", 5), createProduct);
router.route("/admin/products").get(isAuthentictedUser , authorizeRoles("admin") , getAllProductsAdmin)
router.route("/admin/product/:id").put(isAuthentictedUser, authorizeRoles("admin"), upload.array("images", 5), updateProduct)
.delete(isAuthentictedUser, authorizeRoles("admin"), deleteProduct);
router.put("/admin/product/:id/discount", updateProductDiscount);
router.route("/product/:id").get(getProductDetails);

// Dynamic Sitemap for SEO
router.get("/sitemap.xml", async (req, res) => {
  try {
    const products = await require("../model/ProductModel").find();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add home page
    xml += '  <url>\n    <loc>https://product-trust.onrender.com/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
    
    // Add products page
    xml += '  <url>\n    <loc>https://product-trust.onrender.com/products</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n';
    
    // Add all products
    products.forEach(product => {
      xml += '  <url>\n';
      xml += `    <loc>https://product-trust.onrender.com/product/${product._id}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router  