import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { UPDATE_USER_RESET } from "../../constants/userConstanat";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import Loader from "../layouts/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UpdateUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = id;
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profileData
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update User" />
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
                gap: "10px",
              }}
            >
              <Box>
                <Navbar toggleHandler={toggleHandler} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  padding: { xs: "1rem", sm: "2rem" },
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const myForm = new FormData();
                    myForm.set("name", name);
                    myForm.set("email", email);
                    myForm.set("role", role);
                    dispatch(updateUser(userId, myForm));
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "black",
                        width: 56,
                        height: 56,
                      }}
                    >
                      <AccountCircleIcon />
                    </Avatar>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#414141",
                        fontWeight: "bold",
                      }}
                    >
                      Update Role
                    </Typography>

                    <Box sx={{ width: "100%", maxWidth: "400px" }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />

                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <MailOutlineIcon style={{ color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ marginBottom: 2 }}
                      />

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            marginBottom: 1,
                            color: "#414141",
                            fontWeight: 600,
                          }}
                        >
                          Role*
                        </Typography>
                        <Select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          fullWidth
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>Choose Role</em>
                          </MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                        </Select>
                      </Box>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={updateLoading || role === ""}
                        sx={{
                          backgroundColor: "#000",
                          color: "#fff",
                          padding: "0.8rem",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#ed1c24" },
                          "&:disabled": { backgroundColor: "#999" },
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default UpdateUser;


