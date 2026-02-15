import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import CricketBallLoader from "../layouts/loader/Loader";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import useStyles from "./LoginFromStyle";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );
  const { user } = useSelector((state) => state.userData);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
          setAvatar(file); // Store the actual file object
      };
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsValidEName(event.target.value.length >= 4);
  };

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    if (avatar) {
      myForm.set("avatar", avatar);
    }

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

      navigate("/account");
      dispatch(load_UserProfile());
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const isSignInDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={UpdateProfileSubmitHandler}>
            <Avatar className={classes.avatar}>
              <UpdateIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Update Profile Details
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className={`${classes.nameInput} ${classes.textField}`}
              value={name}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== ""
                  ? "Name must be at least 4 characters long."
                  : ""
              }
              onChange={handleNameChange}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={`${classes.emailInput} ${classes.textField}`}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Please enter a valid email address."
                  : ""
              }
            />

            <div className={classes.root}>
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                className={classes.avatar2}
              />
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={classes.uploadAvatarButton}
                >
                  <p className={classes.uploadAvatarText}>Upload Avatar</p>
                </Button>
              </label>
            </div>

            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled || loading}
              style={{ marginTop: "3rem" }}
              type="submit"
            >
              {loading ? "Updating..." : "Update Profile"}
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

export default UpdateProfile;
