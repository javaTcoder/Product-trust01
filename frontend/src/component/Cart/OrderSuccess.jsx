import React from "react";

import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  orderSuccess: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "9rem",
    backgroundColor: "white",
  },
  successIcon: {
    fontSize: "8rem",
    color: "#4caf50",
    marginBottom: "32px",
  },
  successText: {
    marginBottom: "16px",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "rgba(0, 0, 0, 0.87)",
    textShadow: `2px 2px 4px rgba(0, 0, 0, 0.54)`,
  },
  link: {
    textDecoration: "none",
  },
  viewOrdersButton: {
    marginTop: "32px",
    padding: "16px 32px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "32px",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },
});

function OrderSuccess() {
  const classes = useStyles();

  return (
    <div className={classes.orderSuccess}>
      <CheckCircleIcon className={classes.successIcon} />

      <Typography variant="h4" className={classes.successText}>
        Congratulations!
        <br />
        Your Order has been Placed Successfully
      </Typography>
      <Link to="/orders" className={classes.link}>
        <Button variant="contained" className={classes.viewOrdersButton}>
          View Orders
        </Button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
