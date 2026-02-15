import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  formContainer: {
    minHeight: "calc(100vh - 120px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
    padding: "0",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    borderRadius: "12px",
    padding: "2.5rem 2rem 2rem 2rem",
    background: "#fff",
    boxShadow: "0 6px 32px 0 rgba(60,72,88,.15)",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  avatar: {
    margin: "0 auto 1rem auto",
    backgroundColor: "#292929",
    width: 56,
    height: 56,
  },
  heading: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#292929",
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "1px",
    fontFamily: "inherit",
  },
  emailInput: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  passwordInput: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  showPasswordButton: {
    minWidth: "36px",
    padding: "6px",
    color: "#292929",
    background: "transparent",
    "&:hover": {
      background: "#f5f5f5",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: "#fafbfc",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#292929",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ed1c24",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#888",
      fontSize: "15px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ed1c24",
    },
  },
  rememberMeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  forgotPasswordLink: {
    color: "#292929",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
      color: "#ed1c24",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#727272",
    textAlign: "center",
    lineHeight: "17px",
    paddingLeft: "4px",
    marginTop: "0.5rem",
    fontSize: "12px",
  },
  loginButton: {
    color: "#fff",
    backgroundColor: "#292929",
    border: "none",
    borderRadius: "8px",
    marginTop: "0.5rem",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "0.8rem 0",
    transition: "background 0.2s",
    "&:disabled": {
      backgroundColor: "#bdbdbd",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#ed1c24",
    },
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "#292929",
    fontSize: "14px",
    "&:hover": {
      color: "#ed1c24",
    },
  },
  createAccount: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#292929",
    paddingLeft: "6px",
    "&:hover": {
      color: "#ed1c24",
      textDecoration: "underline",
    },
  },
}));

export default useStyles;
