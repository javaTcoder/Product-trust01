import React from "react";
import {
  LocalShipping,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";

const classes = {
  Services_section: {
    backgroundColor: "#000",
    paddingTop: "4px",
    paddingBottom: "4px",
    fontFamily: "'Roboto', sans-serif",
  },
  Services_wrapper: {
    display: "flex",
    gap: "2.5rem",
    width: "100%",
    flexWrap: "wrap",
    height: "auto",
    paddingTop: "20px",
    justifyContent: "center",
  },
  Services_card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: "8px",
    padding: "16px",
    marginLeft: "1rem",
    marginBottom: "16px",
  },
  Services_icon: {
    color: "#ed1c24",
    fontSize: "3rem",
    marginRight: "20px",
  },
  Services_cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  Services_cardInfo: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 300,
    fontSize: "0.8rem",
  },
};

const servicesData = [
  {
    id: 1,
    icon: <LocalShipping fontSize="large" />,
    title: "Express Delivery",
    info: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: <Security fontSize="large" />,
    title: "Brand Warranty",
    info: "100% Original products",
  },
  {
    id: 3,
    icon: <LocalOffer fontSize="large" />,
    title: "Exciting Deals",
    info: "On all prepaid orders",
  },
  {
    id: 4,
    icon: <CreditCard fontSize="large" />,
    title: "Secure Payments",
    info: "SSL / Secure certificate",
  },
];

const Services = () => {
  return (
    <div style={classes.Services_section}>
      <div style={classes.Services_wrapper}>
        {servicesData.map((item) => (
          <div style={classes.Services_card} key={item.id}>
            <div style={classes.Services_icon}>{item.icon}</div>
            <div>
              <div style={classes.Services_cardTitle}>{item.title}</div>
              <div style={classes.Services_cardInfo}>{item.info}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
