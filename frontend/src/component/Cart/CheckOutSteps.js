import React, { Fragment } from "react";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },

    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const stepStyle = { paddingTop: "120px", backgroundColor: "#fff" };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index ? true:false } completed={activeStep >= index ? true : false}>
            <StepLabel style={{color: activeStep >= index ? "#266060" : "#0000012a"}} icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};
export default CheckOutSteps;
