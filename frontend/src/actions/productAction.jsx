import axios from "axios";
import { toast } from "react-toastify";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
 
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
 
  CLEAR_ERRORS,

} from "../constants/productsConstatns";

// get ALL Products
export const getProduct = (
  keyword = "",
  currentPage = 1,
  price = [0, 100000],
  category,
  ratings = 0
) => {
  return async (dispatch) => {
    try {
      // initial state :
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // when category selected by user then using another link
      if (category) {
        link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;
      }
      
      //console.log("Fetching products from:", link);
      const { data } = await axios.get(link);
      //console.log("API Response:", data);
      //console.log("Products in response:", data.products);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
      
      //console.log("Dispatched ALL_PRODUCT_SUCCESS with payload:", data);
    } catch (error) {
      //console.error("Error in getProduct:", error.response?.data || error.message);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response?.data?.message || error.message || "Failed to fetch products",
      });
    }
  };
};

// Get Products Details
export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/product/${id}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.Product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};


// admin product request :
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    // Log FormData contents properly
    if (productData instanceof FormData) {
      const imagesCount = productData.getAll("images").length;
      console.log("createProduct payload type: FormData, images count:", imagesCount);
      // Log all form fields for debugging
      for (let [key, value] of productData.entries()) {
        console.log(`  ${key}:`, value instanceof Blob ? `Blob(${value.size} bytes)` : value);
      }
    } else {
      console.log("createProduct payload type: JSON");
    }

    const config = { headers: {} };
    if (!(productData instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    const { data } = await axios.post("/api/v1/admin/product/new", productData, {
      ...config,
      withCredentials: true,
    });

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Log the full server response (if any) for debugging
    console.error("createProduct error response:", error.response ? error.response.data : error);
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        (error.response && error.response.data) ||
        error.message ||
        "Something went wrong",
    });
  }
};



// Delete Product request

export function deleteProduct(id) {
  return async function(dispatch) {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
  };
}

// updateProduct;
export const updateProduct = (id, productData) => async (dispatch) => {
         try {
           dispatch({ type: UPDATE_PRODUCT_REQUEST });

           const config = {
              withCredentials: true,
           };

           const { data } = await axios.put(
             `/api/v1/admin/product/${id}`,
             productData,
             config
           );

           dispatch({
             type: UPDATE_PRODUCT_SUCCESS,
             payload: data.success,
           });
         } catch (error) {
           dispatch({
             type: UPDATE_PRODUCT_FAIL,
             payload: error.message,
           });
         }
       };

 // Update product discount (admin)
 export const updateProductDiscount = (productId, discountPercentage) => async (dispatch) => {
   try {
     dispatch({ type: "UPDATE_PRODUCT_DISCOUNT_REQUEST" });
     const config = { headers: { "Content-Type": "application/json" } };
     const { data } = await axios.put(
       `/api/v1/admin/product/${productId}/discount`,
       { discountPercentage },
       config
     );
     dispatch({ type: "UPDATE_PRODUCT_DISCOUNT_SUCCESS", payload: data.product });
     toast.success("Discount updated");
   } catch (error) {
     dispatch({
       type: "UPDATE_PRODUCT_DISCOUNT_FAIL",
       payload: error.response?.data?.message || error.message,
     });
     toast.error(error.response?.data?.message || error.message);
   }
 };

 

// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
