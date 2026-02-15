import React, { useState, useEffect } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Typography, Container } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { toast } from "react-toastify";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { useNavigate } from "react-router-dom";
import ProductImg from "../../Image/admin/products.png";
import ordersImg from "../../Image/admin/order.png";
import usersImg from "../../Image/admin/user.png"; 
Highcharts3D(Highcharts);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { users, error: usersError } = useSelector((state) => state.allUsers);

  //const alert = useAlert();

  let OutOfStock = 0;
  products &&
    products.forEach((element) => {
      // check how much items out of stocks in products array
      if (element.stock === 0) {
        OutOfStock += 1;
      }
    });



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    if (usersError) {
      toast.error(usersError);
      dispatch(clearErrors);
    }
    if (ordersError) {
      toast.error(ordersError);
      dispatch(clearErrors);
    }
    
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [dispatch, error, ordersError, usersError]);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // total Amount Earned
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // chart js values for Line component
  const lineOptions = {
    accessibility: { enabled: false },
    chart: {
      type: "line",
      style: {
        fontFamily: "Roboto",
        fontWeight: "900",
      },
    },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    series: [
      {
        name: "TOTAL AMOUNT",
        data: [0, totalAmount],
      },
    ],
    plotOptions: {
      line: {
        lineWidth: 4,
        marker: {
          enabled: true,
        },
        color: "black",
      },
    },
  };
  // now set the Value of stock of the product for Doughnut component in  chart .

  const doughnutOptions = {
    accessibility: {
      enabled: false,
      point: {
        valueSuffix: "%",
      },
    },
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Product Stock Status",
      align: "center",
      style: {
        color: "black",
        fontWeight: "900",
      },
    },

    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontWeight: "500",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        data: [
          ["Out of Stock", products.length - OutOfStock],

          {
            name: "Out of Stock",
            y: OutOfStock,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };

  // to close the sidebar when the screen size is greater than 1000px
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Dashboard - Admin Panel" />
          <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            {/* Sidebar */}
            <Box
              sx={{
                width: { xs: "0%", md: "20%" },
                backgroundColor: "white",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                margin: "1rem",
                display: { xs: "none", md: "block" },
                height: "fit-content",
              }}
            >
              <Sidebar />
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "1rem",
              }}
            >
              {/* Navbar */}
              <Box sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <Navbar toggleHandler={toggleHandler} />
              </Box>

              {/* Summary Cards */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                  gap: "1.5rem",
                }}
              >
                {/* Products Card */}
                <Box
                  onClick={() => navigate("/admin/products")}
                  sx={{
                    background: `linear-gradient(135deg, rgba(65, 65, 65, 0.9), rgba(237, 28, 36, 0.9)), url(${ProductImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    padding: "2rem",
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, boxShadow 0.3s ease",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "140px",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 8px 24px rgba(237, 28, 36, 0.3)",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: "3rem", marginBottom: "0.5rem" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Total Products
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, marginTop: "0.5rem" }}>
                    {products && products.length}
                  </Typography>
                </Box>

                {/* Orders Card */}
                <Box
                  onClick={() => navigate("/admin/orders")}
                  sx={{
                    background: `linear-gradient(135deg, rgba(65, 65, 65, 0.9), rgba(237, 28, 36, 0.9)), url(${ordersImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    padding: "2rem",
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, boxShadow 0.3s ease",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "140px",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 8px 24px rgba(237, 28, 36, 0.3)",
                    },
                  }}
                >
                  <AssignmentIndIcon sx={{ fontSize: "3rem", marginBottom: "0.5rem" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Total Orders
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, marginTop: "0.5rem" }}>
                    {orders && orders.length}
                  </Typography>
                </Box>

                {/* Users Card */}
                <Box
                  onClick={() => navigate("/admin/users")}
                  sx={{
                    background: `linear-gradient(135deg, rgba(65, 65, 65, 0.9), rgba(237, 28, 36, 0.9)), url(${usersImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    padding: "2rem",
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, boxShadow 0.3s ease",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "140px",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 8px 24px rgba(237, 28, 36, 0.3)",
                    },
                  }}
                >
                  <PeopleIcon sx={{ fontSize: "3rem", marginBottom: "0.5rem" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Total Users
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, marginTop: "0.5rem" }}>
                    {users && users.length}
                  </Typography>
                </Box>
              </Box>

              {/* Charts Section */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
                  gap: "2rem",
                }}
              >
                {/* Doughnut Chart */}
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "2rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: "1rem", color: "#414141" }}>
                    Product Stock Status
                  </Typography>
                  <HighchartsReact highcharts={Highcharts} options={doughnutOptions} />
                </Box>

                {/* Revenue Card */}
                <Box
                  sx={{
                    background: `linear-gradient(135deg, rgba(65, 65, 65, 0.95), rgba(237, 28, 36, 0.95)), url(${ProductImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    padding: "2rem",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "300px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <BarChartIcon sx={{ fontSize: "3rem", marginBottom: "1rem" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, marginTop: "1rem", color: "#FFD700" }}>
                    ₹{totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Line Chart */}
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: "1rem", color: "#414141" }}>
                  Revenue Trend
                </Typography>
                <HighchartsReact highcharts={Highcharts} options={lineOptions} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Dashboard;
