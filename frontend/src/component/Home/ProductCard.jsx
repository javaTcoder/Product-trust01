import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { FitScreen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {dispalyMoney  ,generateDiscountedPrice} from "../DisplayMoney/DisplayMoney"
import { addItemToCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
import SizeSelectModal from "../Product/SizeSelectModal";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  
  // Use product.discountPercentage from MongoDB for discount calculation
  const discountPct = product.discountPercentage || 0;
  let discountPrice = product.price * (1 - discountPct / 100);
  discountPrice = dispalyMoney(discountPrice);
  const oldPrice = dispalyMoney(product.price);
  
  const truncated =
    product.description
      .split(" ")
      .slice(0, 5)
      .join(" ") + "...";
      const  nameTruncated = product.name.split(" ").slice(0, 3).join(" ") + "...";


      const addTocartHandler = () => {
        // Check if product is in stock
        if (product.Stock <= 0) {
          toast.error("Product is Out of Stock");
          return;
        }
        
        // Show size modal for clothing products
        if (product.category && product.category.toLowerCase().includes("clothing")) {
          setSizeModalOpen(true);
        } else {
          // For non-clothing items, add directly without size
          dispatch(addItemToCart(product._id, 1, "N/A"));
          toast.success("Item Added To Cart");
        }
      };

      const handleSizeSelect = (size) => {
        dispatch(addItemToCart(product._id, 1, size));
      };

  return (
    <>
      <Card sx={{ width: "280px", height: "fit-content", margin: 2, backgroundColor: "white", cursor: "pointer" }}>
        <Link
          className="productCard"
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardActionArea>
            <CardMedia sx={{ height: 200, width: "90%", objectFit: "cover", margin: "1rem 1rem 0 1rem" }} image={product.images[0].url} />
            <CardContent>
              <Typography
                gutterBottom
                color="black"
                fontWeight="bold"
                sx={{ fontWeight: "700" }}
              >
                {nameTruncated}
              </Typography>
              <Box display="flex" alignItems="center">
                <Rating
                  name="rating"
                  value={product.ratings}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ color: "#ed1c24", marginRight: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  ({product.numOfReviews})
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
                sx={{ fontSize: "0.8rem", fontWeight: 500, marginTop: 1, marginBottom: 1, display: "-webkit-box", overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
              >
                {truncated}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ textDecoration: "line-through", fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)", marginRight: 1 }}>
                  {oldPrice}
                </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {discountPrice}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: product.Stock <= 0 ? "#ccc" : "black", color: product.Stock <= 0 ? "#999" : "white", borderRadius: 1, fontWeight: "bold", width: "100%", height: 45, "&:hover": { backgroundColor: product.Stock <= 0 ? "#ccc" : "#ed1c24", color: product.Stock <= 0 ? "#999" : "black", fontWeight: "bold" }, cursor: product.Stock <= 0 ? "not-allowed" : "pointer" } }
          onClick={addTocartHandler}
          disabled={product.Stock <= 0}
        >
          {product.Stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Box>
    </Card>

    <SizeSelectModal
      open={sizeModalOpen}
      onClose={() => setSizeModalOpen(false)}
      onSizeSelect={handleSizeSelect}
      productName={product.name}
    />
    </>
  );
};

export default ProductCard;
