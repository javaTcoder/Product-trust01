import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import CricketBallLoader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated, error } = useSelector(
    (state) => state.profileData
  );
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
    setisValidConfirmPassword(event.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      navigate("/account");
    }
  }, [dispatch, error, isUpdated, loading, navigate]);

  const isSignInDisabled = !(
    newPassword &&
    confirmPassword &&
    oldPassword &&
    isValidPassword
  );

  return (
    <>
      <MetaData title={"Update Password"} />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={updatePasswordSubmitHandler}>
            <Avatar className={classes.avatar}>
              <SecurityUpdateGoodIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Update Password
            </Typography>

            <TextField
              label="Old Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              error={!isValidPassword && newPassword !== ""}
              helperText={
                !isValidPassword && newPassword !== ""
                  ? "Password must be at least 8 characters"
                  : ""
              }
              value={newPassword}
              onChange={handlePasswordChange}
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidConfirmPassword && confirmPassword !== ""}
              helperText={
                !isValidConfirmPassword && confirmPassword !== ""
                  ? "Password must be at least 8 characters"
                  : ""
              }
              className={`${classes.passwordInput} ${classes.textField}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              type="submit"
              sx={{ marginTop: "3.5rem" }}
            >
              Update New Password
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Link to="/account" className={classes.createAccount}>
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdatePassword;
