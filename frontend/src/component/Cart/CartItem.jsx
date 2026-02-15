import React  from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  dispalyMoney,
  generateDiscountedPrice,

} from "../DisplayMoney/DisplayMoney";


const useStyles = makeStyles({
  roots11: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    "@media (max-width: 899px)": {
      padding: "3rem 3rem",
      margin: "1rem 3rem",
    },
    "@media (max-width: 699px)": {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },
    "@media (max-width: 499px)": {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  root11: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1rem",
    width: "fit-content",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    margin: "1rem 2rem",
    height: "auto",

    "@media (max-width: 899px)": {
      padding: "3rem",
      margin: "1rem 3rem",
    },
    "@media (max-width: 699px)": {
      padding: "2rem",
      margin: "1rem",
      width: "80%",
    },

    "@media (max-width: 499px)": {
      padding: "2rem",
      margin: "1rem",
      width: "65%",
    },
  },
  media: {
    width: "200px",
    height: "240px",
    marginRight: "16px",

    "@media (max-width: 699px)": {
      with: "35%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    "@media (max-width: 599px)": {
      with: "30%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
    "@media (max-width: 499px)": {
      with: "20%",
      marginLeft: "-2rem",
      paddingRight: "1rem",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "fit-content",

    "@media (max-width: 699px)": {
      padding: "0",
      width: "fit-content",
    },
    "@media (max-width: 599px)": {
      padding: "0",
      width: "fit-content",
    },
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  title: {
    width: "90%",
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "1rem",
    "@media (max-width: 599px)": {
      fontSize: "14px",
      marginLeft: "0",
    },
    "& .MuiTypography-subtitle1 ": {
      "@media (max-width: 599px)": {
        fontSize: "14px",
      },
    },
  },

  cartDeleteIcon: {
    color: "black",
    marginTop: "-.5rem",

    "@media (max-width: 599px)": {
      marginRight: "-2.5rem",
    },
    "&:hover": {
      color: "#ed1c24",
    },
    "@media (max-width: 499px)": {
      marginRight: "-2rem",
    },
  },

  priceItem: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    marginLeft: "1.2rem",
    "@media (max-width: 599px)": {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
  },

  cartSubHeadings: {
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#414141",
    "@media (max-width: 599px)": {
      fontSize: "14px",
    },
    "@media (max-width: 499px)": {
      fontSize: "12px",
    },
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: 400,
    "@media (max-width: 599px)": {
      fontSize: "14px",
    },
    "@media (max-width: 499px)": {
      fontSize: "13px",
    },
  },
  itemOldPrice: {
    marginLeft: "-8px",
    fontSize: "14px",
    fontWeight: 400,

    "@media (max-width: 499px)": {
      fontSize: "12px",
    },
  },

  contentBottom: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "baseline",
    width: "fit-content",
    flexDirection: "column",
    "@media (max-width: 599px)": {
      marginLeft: "0rem",
      marginRight: "-1rem",
    },
    "@media (max-width: 550px)": {
      position: "relative",
      marginLeft: "0rem",
    },
  },
 
});




function CartItem({
  deleteCartItems,
  item,
  decreaseQuantity,
  increaseQuantity,
  length,
}) {
  const classes = useStyles();

  /// calculate price after discount using item.discountPercentage from MongoDB
  const discountPct = item.discountPercentage || 0;
  let finalPrice = item.price * (1 - discountPct / 100);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = dispalyMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);

  return (
    <Card className={length < 2 ? classes.root11 : classes.roots11}>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.name}
      />
      <CardContent className={classes.content}>
        <div className={classes.contentTop}>
          <div className={classes.cartHeader}>
            <Typography variant="subtitle1" className={classes.title}>
              {item.name}
              {item.size && item.size !== "N/A" && (
                <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.3rem" }}>
                  Size: <strong>{item.size}</strong>
                </div>
              )}
            </Typography>

            <IconButton
              aria-label="delete"
              className={classes.cartDeleteIcon}
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className={classes.priceItem}>
            <Typography className={classes.cartSubHeadings} variant="body2">
              Price1:
            </Typography>
            <Typography variant="subtitle1" className={classes.itemPrice}>
              {finalPrice}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="black"
              className={classes.itemOldPrice}
            >
              <del>{discountedPrice}</del>
            </Typography>
          </div>
        </div>
        <div className={classes.contentBottom}>
          <div className="prod_details_additem">
            <h5>QTY:</h5>
            <div className="additem">
              <IconButton
                onClick={() => decreaseQuantity(item.productId, item.quantity, item.size)}
                className="additem_decrease"
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <IconButton
                onClick={() =>
                  increaseQuantity(item.productId, item.quantity, item.stock, item.size)
                }
                className="additem_increase"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.priceItem}>
            <Typography variant="body2" className={classes.cartSubHeadings}>
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              {total}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
