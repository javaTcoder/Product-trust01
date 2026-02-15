import React from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layouts/MataData/MataData";
import CheckoutSteps from "./CheckoutSteps ";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = React.useState(shippingInfo.address);
  const [firstName, setFirstName] = React.useState(shippingInfo.firstName);
  const [lastName, setLastName] = React.useState(shippingInfo.lastName);
  const [city, setCity] = React.useState(shippingInfo.city);
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode);
  const [state, setState] = React.useState(shippingInfo.state);
  const [country, setCountry] = React.useState(shippingInfo.country || "India");
  const [phoneNo, setPhone] = React.useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = React.useState(shippingInfo.email);
  const [saveAddress, setSaveAddress] = React.useState(false);
  const [sameBillingDelivery, setSameBillingDelivery] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isPhoneNoValid, setIsPhoneNoValid] = React.useState(true);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (value) => {
    setCountry(value.label);
  };

  const handlePhoneChange = (event) => {
    const newPhoneNo = event.target.value;
    setPhone(newPhoneNo);
    setIsPhoneNoValid(newPhoneNo !== "" && newPhoneNo.length === 10);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    setEmail(newEmail);
    setIsValidEmail(
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked);
  };

  const handleSameBillingDeliveryChange = (event) => {
    setSameBillingDelivery(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === "" ||
      phoneNo === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (phoneNo && phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        email,
        firstName,
        lastName,
      })
    );
    navigate("/process/payment");
  };

  return (
    <>
      <div className="shippingPage">
        <MetaData title={"Shipping Info"} />
        <CheckoutSteps activeStep={1} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
            width: "100%",
          }}
        >
          <Box sx={{ width: { xs: "95%", sm: "85%", md: "60%" } }}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  marginBottom: 3,
                  color: "#414141",
                }}
              >
                SHIPPING ADDRESS
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#414141" },
                      "&.Mui-focused fieldset": { borderColor: "#414141" },
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#414141" },
                      "&.Mui-focused fieldset": { borderColor: "#414141" },
                    },
                  }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{
                    gridColumn: { xs: "1", sm: "1 / -1" },
                  }}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phoneNo}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!isPhoneNoValid && phoneNo !== ""}
                  helperText={
                    !isPhoneNoValid && phoneNo && "Please enter a valid phone number."
                  }
                  sx={{
                    gridColumn: { xs: "1", sm: "1 / -1" },
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!isValidEmail && email !== ""}
                  helperText={
                    !isValidEmail && email && "Please enter a valid email address."
                  }
                  sx={{
                    gridColumn: { xs: "1", sm: "1 / -1" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                    />
                  }
                  label="Save Address to Address Book"
                  sx={{
                    gridColumn: { xs: "1", sm: "1 / -1" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameBillingDelivery}
                      onChange={(e) => setSameBillingDelivery(e.target.checked)}
                    />
                  }
                  label="My billing and delivery information are the same."
                  sx={{
                    gridColumn: { xs: "1", sm: "1 / -1" },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "0.8rem 2rem",
                    fontWeight: 600,
                    gridColumn: { xs: "1", sm: "1 / -1" },
                    "&:hover": { backgroundColor: "#ed1c24" },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Shipping;
