import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/reviewActions";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/reviewConstants";
import StarRateIcon from "@mui/icons-material/StarRate";

function ProductReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId.trim()));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId));
  };

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.5,
      headerClassName: "column-header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 0.8,
      margin: "0 auto",
      headerClassName: "column-header hide-on-mobile",
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.8,
    },
    {
      field: "recommend",
      headerName: "Recommend",
      minWidth: 100,
      flex: 1,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.row.recommend === "Yes" ? "greenColor" : "redColor";
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "column-header hide-on-mobile",
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 230,
      headerClassName: "column-header1",
      sortable: false,
      renderCell: (params) => {
        return (
          <div onClick={() => deleteReviewHandler(params.row.id)}>
            <DeleteIcon className="iconbtn" style={{ marginLeft: "1rem" }} />
          </div>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.ratings,
        recommend: item.recommend ? "Yes" : "No",
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />

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
                  height: "100vh",
                  backgroundColor: "white",
                  padding: "1rem 2rem",
                }}
              >
                <form
                  style={{
                    width: "350px",
                    margin: "-1rem auto 0 auto",
                    borderRadius: "5px",
                    padding: "2rem",
                  }}
                  onSubmit={productReviewsSubmitHandler}
                >
                  <Avatar sx={{ margin: "8px auto", backgroundColor: "black" }}>
                    <StarRateIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      textAlign: "center",
                      marginBottom: "1.5rem",
                      color: "#414141",
                      fontWeight: "bold",
                    }}
                  >
                    All Reviews
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value.trim())}
                    sx={{
                      marginBottom: "2rem",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                        color: "black",
                        padding: "12px 14px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        fontSize: "14px",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                        fontSize: "14px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <StarIcon style={{ fontSize: 20, color: "#414141" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    id="createProductBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#000",
                      border: "2px solid #000",
                      marginTop: "1rem",
                      "&:disabled": {
                        backgroundColor: "#444444",
                        color: "#FFFFFF",
                        borderColor: "#444444",
                      },
                      "&:hover": {
                        backgroundColor: "#ed1c24",
                        color: "#fff",
                        borderColor: "#ed1c24",
                      },
                    }}
                    disabled={loading || productId === ""}
                  >
                    Search
                  </Button>
                </form>

                {reviews && reviews.length > 0 ? (
                  <div className="productListContainer">
                    <h4 id="productListHeading">ALL REVIEWS</h4>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      autoHeight
                      disableSelectionOnClick
                      className="productListTable"
                    />
                  </div>
                ) : (
                  <h1
                    style={{
                      textAlign: "center",
                      textShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                      color: "#414141",
                      fontWeight: "900",
                    }}
                  >
                    No Reviews Found
                  </h1>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ProductReviews;
