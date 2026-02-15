import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  generateDiscountedPrice,
  calculateDiscount,
  dispalyMoney,
} from "../DisplayMoney/DisplayMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Rating from "@mui/material/Rating";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import useActive from "../hook/useActive";
//import ReviewCard from "./ReviewCard";
import ReviewCard from "../Review/ReviewCard";
import {
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
//import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import MetaData from "../layouts/MataData/MataData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../layouts/loader/Loader";
import Button from "@mui/material/Button";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstatns";
import SizeSelectModal from "./SizeSelectModal";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const alert = useAlert();

  const [quantity, setQuantity] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);


  const [previewImg, setPreviewImg] = useState("");
  const { handleActive, activeClass } = useActive(0);

  const { product, loading, error , success  } = useSelector(
    (state) => state.productDetails
  );


useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearErrors);
  }
  if (success) {
    handleActive(0);
    dispatch({ type: PRODUCT_DETAILS_RESET });
  }
  dispatch(getProductDetails(id));
}, [dispatch, error, success, id]);

  // Update previewImg whenever product.images changes
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setPreviewImg(product.images[0].url);
    }
  }, [product]);


  // handling Add-to-cart
  const handleAddItem = () => {
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
      dispatch(addItemToCart(id, quantity, "N/A"));
      toast.success("Item Added To Cart");
    }
  };

  const handleSizeSelect = (size) => {
    // Double-check stock before adding
    if (product.Stock <= 0) {
      toast.error("Product is Out of Stock");
      return;
    }
    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };





  // handling Preview image
  const handlePreviewImg = (images, i) => {
   
    setPreviewImg(images[i].url);
    handleActive(i);
  };

  function increaseQuantityHandler() {
    if (product.Stock <= quantity) {
      return;
    }

    setQuantity((prv) => prv + 1);
  }

  function deceraseQuantityHandler() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prv) => prv - 1);
  }

  // calculating Prices
  const discountPct = product.discountPercentage || 0;
  const finalPrice = product.price * (1 - discountPct / 100);
  const discountedPrice = product.price - finalPrice;
  const newPrice = dispalyMoney(finalPrice);
  const oldPrice = dispalyMoney(product.price);
  const savedPrice = dispalyMoney(discountedPrice);
  const savedDiscount = discountPct;

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <>
          <div className="prodcutDetialsContainer">
            <MetaData title={product.name} />
            <section id="product_details" className="section">
              <div className="product_container">
                <div className="wrapper prod_details_wrapper">
                  {/*=== Product Details Left-content ===*/}
                  <div className="prod_details_left_col">
                    <div className="prod_details_tabs">
                      {product.images &&
                        product.images.map((img, i) => (
                          <div
                            key={i}
                            className={`tabs_item ${activeClass(i)}`}
                            onClick={() => handlePreviewImg(product.images, i)}
                          >
                            <img src={img.url} alt="product-img" />
                          </div>
                        ))}
                    </div>
                    <figure className="prod_details_img">
                      <img src={previewImg} alt="product-img" />
                    </figure>
                  </div>

                  {/*=== Product Details Right-content ===*/}
                  <div className="prod_details_right_col_001">
                    <h1 className="prod_details_title">{product.name}</h1>
                    <h4 className="prod_details_info">
                      {product.info && product.info}
                    </h4>

                    <div className="prod_details_ratings">
                      <Rating
                        value={product.ratings}
                        precision={0.5}
                        readOnly
                        style={{ color: "black", fontSize: 16 }}
                      />
                      <span>|</span>
                      <Link
                        to="#"
                        style={{ textDecoration: "none", color: "#414141" }}
                      >
                        {product.numOfReviews} Ratings
                      </Link>
                    </div>

                    <div className="prod_details_price">
                      <div className="price_box">
                        <h2 className="price">
                          {newPrice} &nbsp;
                          <small className="del_price">
                            <del>{oldPrice}</del>
                          </small>
                        </h2>
                        <p className="saved_price">
                          You save: {savedPrice} ({savedDiscount}%)
                        </p>
                        <span className="tax_txt">
                          (Inclusive of all taxes)
                        </span>
                      </div>

                      <div className="badge">
                        {product.Stock >= 1 ? (
                          <span className="instock">
                            <DoneIcon /> In Stock
                          </span>
                        ) : (
                          <span className="outofstock">
                            <CloseIcon />
                            Out of stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="seprator2"></div>

                    <div className="productDescription">
                      <div className="productDiscriptiopn_text">
                        <h4>Descripition :</h4>
                        <p>{product.description}</p>
                      </div>

                      <div className="deliveryText">
                        <LocalShippingOutlinedIcon />
                        We deliver! Just say when and how.
                      </div>
                    </div>
                    <div className="seprator2"></div>

                    <div className="prod_details_additem">
                      <h5>QTY :</h5>
                      <div className="additem">
                        <IconButton
                          onClick={deceraseQuantityHandler}
                          className="additem_decrease"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Input
                          readOnly
                          type="number"
                          value={quantity}
                          className="input"
                        />
                        <IconButton
                          onClick={increaseQuantityHandler}
                          className="additem_increase"
                        >
                          <AddIcon />
                        </IconButton>
                      </div>

                      <Button
                        variant="contained"
                        className="prod_details_addtocart_btn"
                        onClick={handleAddItem}
                        disabled={product.Stock <= 0}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="reviewCard">
              <ThemeProvider theme={createTheme()}>
                <ReviewCard product={product} />
              </ThemeProvider>
            </div>

            <SizeSelectModal
              open={sizeModalOpen}
              onClose={() => setSizeModalOpen(false)}
              onSizeSelect={handleSizeSelect}
              productName={product.name}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
