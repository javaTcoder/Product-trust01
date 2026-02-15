import React from "react";
import { Stepper, Step, StepLabel, StepConnector, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";

const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
  },
  active: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#000000",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#dddddd",
    borderRadius: 1,
  },
}))(StepConnector);

const ColorlibStepIcon = ({ active, completed, icon, onClick }) => {
  const baseStyle = {
    backgroundColor: "#666666",
    color: "#FFFFFF",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 16,
  };

  if (active) {
    return (
      <Box
        sx={{
          ...baseStyle,
          backgroundColor: "#ed1c24",
          boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        }}
      >
        {icon}
      </Box>
    );
  }

  if (completed) {
    return <Box sx={{ ...baseStyle, backgroundColor: "#000000" }}>{icon}</Box>;
  }

  return <Box sx={baseStyle}>{icon}</Box>;
};

const CheckoutSteps = ({ activeStep }) => {
  const navigate = useNavigate();

  const steps = [
    { label: "BAG", icon: "1", link: "/cart" },
    { label: "DELIVERY", icon: "2", link: "/shipping" },
    { label: "PAYMENT", icon: "3", link: "/process/payment" },
    { label: "ORDER COMPLETE", icon: "4", link: "/success" },
  ];

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      navigate(steps[stepIndex].link);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "7rem",
        width: "100%",
        padding: { xs: "0 1rem", md: "0" },
      }}
    >
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#414141",
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
