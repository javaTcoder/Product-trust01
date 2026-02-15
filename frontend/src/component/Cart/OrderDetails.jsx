import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

// simple INR formatter
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    Number(value) || 0
  );

const OrderDetailsSection = ({ item /* totalDiscount, totalPrice */ }) => {
  // ensure price and quantity exist
  const unitPrice = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;
  const subtotal = unitPrice * quantity;

  // determine discount percentage (support different shapes)
  const discountPercentage =
    Number(item.discountPercentage) ||
    Number(item.product?.discountPercentage) ||
    0;

  const discountedUnitPrice =
    discountPercentage > 0
      ? unitPrice * (1 - discountPercentage / 100)
      : unitPrice;
  const discountedTotal = discountedUnitPrice * quantity;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "1rem",
        padding: "1rem 0rem 0rem 0rem",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "500", fontSize: "18px", marginBottom: 1 }}>
          {item.name}
        </Typography>

        {item.size && item.size !== "N/A" && (
          <Typography variant="body2" sx={{ fontSize: 16, marginBottom: 1, color: "#00000080" }}>
            <span style={{ fontWeight: 400, marginRight: "10px" }}>
              Size:
            </span>
            <strong>{item.size}</strong>
          </Typography>
        )}

        <Typography variant="body2" sx={{ fontSize: 16, marginBottom: 1, color: "#00000080" }}>
          <span style={{ fontWeight: 400, marginRight: "10px" }}>
            Quantity:
          </span>
          {quantity}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ fontWeight: 400, fontSize: 16 }}>
            {discountPercentage > 0
              ? formatINR(discountedTotal)
              : formatINR(subtotal)}
          </Typography>

          {discountPercentage > 0 && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "#999",
                marginLeft: 2,
                fontSize: 16,
              }}
            >
              {formatINR(subtotal)}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="body2" sx={{ color: "green", fontSize: 16, marginTop: 1 }}>
            <span style={{ marginRight: "10px" }}>Payment:</span> Paid
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailsSection;
