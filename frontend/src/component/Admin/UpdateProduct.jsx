import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstatns";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import Navbar from "./Navbar";

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;
  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const categories = [
    "Cricket Kits",
    "Batting Gloves",
    "Batting Pads",
    "Bats",
    "Bags",
    "Helmets",
    "Balls",
    "Stumps",
    "Shoes",
    "Clothing",
    "Accessories",
  ];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category || "");
      setInfo(product.info);
      setStock(product.Stock);
      setOldImages(product.images);
      setDiscountPercentage(product.discountPercentage || 0);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const dataUrl = reader.result;
          setImagesPreview((prev) => [...prev, dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category || product.category);  // Use product category as fallback
      myForm.set("Stock", Stock);
      myForm.set("info", info);
      myForm.set("discountPercentage", discountPercentage);
      
      // Append base64 images directly as text fields
      imagesPreview.forEach((dataUrl) => myForm.append("images", dataUrl));

      console.log("Submitting product update (FormData) images count:", imagesPreview.length);
      dispatch(updateProduct(productId, myForm));
    } catch (err) {
      console.error("Error preparing product payload:", err);
      toast.error("Failed to prepare product payload: " + (err.message || err));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#f1f1f1",
              justifyContent: "center",
              width: "100%",
              gap: "1rem",
              overflow: "hidden",
              margin: "-1.1rem 0 0 0",
              padding: 0,
            }}
          >
            <Box
              sx={{
                width: { xs: "0%", md: "20%" },
                margin: "0rem",
                height: "fit-content",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                display: { xs: "none", md: "block" },
              }}
            >
              <Sidebar />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "75%" },
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                margin: "-0.5rem 0 0 0",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Box sx={{ margin: "0rem" }}>
                <Navbar toggleHandler={toggleHandler} />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  padding: { xs: "1rem", sm: "2rem" },
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <form
                  encType="application/json"
                  onSubmit={createProductSubmitHandler}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: "black",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                          textAlign: "center",
                          color: "#414141",
                          fontWeight: "bold",
                        }}
                      >
                        Update Product
                      </Typography>
                    </Box>

                    {/* Product Details Section */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                        },
                        gap: "1.5rem",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Product Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ShoppingCartOutlinedIcon
                                style={{ color: "#414141" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        label="Price"
                        type="number"
                        value={price}
                        required
                        fullWidth
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AttachMoneyIcon
                                style={{ color: "#414141" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        label="Stock"
                        type="number"
                        value={Stock}
                        required
                        fullWidth
                        onChange={(e) => setStock(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <StorageIcon
                                style={{ color: "#414141" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        label="Discount Percentage (%)"
                        type="number"
                        inputProps={{ min: 0, max: 100 }}
                        value={discountPercentage}
                        required
                        fullWidth
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AttachMoneyIcon
                                style={{ color: "#414141" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        variant="outlined"
                        label="Product Info"
                        value={info}
                        required
                        fullWidth
                        onChange={(e) => setInfo(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InfoIcon
                                style={{ color: "#414141" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <FormControl fullWidth variant="outlined">
                        <Select
                          value={category}
                          onChange={handleCategoryChange}
                          displayEmpty
                          inputProps={{ name: "category", id: "category-select" }}
                        >
                          <MenuItem value="">
                            <em>Choose Category</em>
                          </MenuItem>
                          {categories.map((cate) => (
                            <MenuItem key={cate} value={cate}>
                              {cate}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Description */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Product Description"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DescriptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Image Upload */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#414141" }}
                      >
                        Product Images
                      </Typography>
                      <Box
                        sx={{
                          border: "2px dashed #414141",
                          borderRadius: "8px",
                          padding: "2rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "1rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#ed1c24",
                            backgroundColor: "rgba(237, 28, 36, 0.05)",
                          },
                        }}
                      >
                        <CollectionsIcon
                          sx={{ fontSize: 48, color: "#414141" }}
                        />
                        <input
                          type="file"
                          id="avatar-input"
                          accept="image/*"
                          onChange={updateProductImagesChange}
                          multiple
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <Button
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            backgroundColor: "#414141",
                            "&:hover": { backgroundColor: "#ed1c24" },
                            width: "100%",
                          }}
                          onClick={handleImageUpload}
                        >
                          Upload Images
                        </Button>
                      </Box>

                      {/* Image Preview */}
                      {imagesPreview.length > 0 ? (
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(2, 1fr)",
                              sm: "repeat(3, 1fr)",
                              md: "repeat(4, 1fr)",
                            },
                            gap: "1rem",
                          }}
                        >
                          {imagesPreview.map((image, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: "100%",
                                aspectRatio: "1/1",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <img
                                src={image}
                                alt={`Preview ${index}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(2, 1fr)",
                              sm: "repeat(3, 1fr)",
                              md: "repeat(4, 1fr)",
                            },
                            gap: "1rem",
                          }}
                        >
                          {oldImages &&
                            oldImages.map((image, index) => (
                              <Box
                                key={index}
                                sx={{
                                  width: "100%",
                                  aspectRatio: "1/1",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                <img
                                  src={image.url}
                                  alt={`Old ${index}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            ))}
                        </Box>
                      )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      disabled={loading}
                      sx={{
                        backgroundColor: "#414141",
                        padding: "0.8rem",
                        fontSize: "1rem",
                        fontWeight: 600,
                        "&:hover": { backgroundColor: "#ed1c24" },
                        "&:disabled": { backgroundColor: "#999" },
                      }}
                    >
                      {loading ? "Updating..." : "Update Product"}
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default UpdateProduct;
