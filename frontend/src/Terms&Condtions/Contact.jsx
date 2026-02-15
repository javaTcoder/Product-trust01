import React from "react";
import axios from "axios";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
//import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MetaData from "../component/layouts/MataData/MataData";

const Root = styled(Box)`
  padding: 8rem 0;
  background-color: white;
  width: 100%;
  overflow: hidden;
`;

const ContactContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  color: #414141;
  font-size: 1.5rem !important;
  padding: 1rem 3rem;
  font-family: Roboto;
  font-weight: 700 !important;
  letter-spacing: 2px;
  @media (max-width: 600px) {
    font-size: 14px !important;
    padding: 1rem 0;
  }
`;

const DividerContact = styled(Divider)`
  width: 90%;
  background-color: #b6b6b6;
  margin: 2rem 0 !important;
`;

const HelpTitle = styled(Typography)`
  font-size: 18px;
  color: black;
  padding: 2rem 0;
`;

const Para = styled(Typography)`
  padding-bottom: 3rem;
  margin-left: 0.5rem;
  color: #414141;
  line-height: 1.5rem;
  font-size: 16px !important;
  width: 90%;
  letter-spacing: 2px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Address = styled(Typography)`
  padding-bottom: 3rem;
  margin-left: 0.5rem;
  color: #414141;
  line-height: 1.5rem;
  font-size: 16px !important;
  width: 90%;
  letter-spacing: 2px;
`;

const ButtonGroup = styled.div`
  & > * {
    margin: 16px;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const SupportButton = styled(Button)`
  background-color: #292929 !important;
  color: white !important;
  width: fit-content !important;
  padding: 0.8rem 2rem !important;
  margin-left: 3.3rem !important;
  border-radius: 5px !important;
  &:hover {
    background-color: #ed1c24 !important;
    color: white !important;
  }
  @media (max-width: 600px) {
    margin-left: 15px !important;
  }
`;

const CallButton = styled(Button)`
  background-color: #292929 !important;
  color: white !important;
  width: fit-content !important;
  padding: 0.8rem 2rem !important;
  margin-left: 1.3rem !important;
  border-radius: 5px !important;
  &:hover {
    background-color: #ed1c24 !important;
    color: white !important;
  }
  @media (max-width: 600px) {
    padding: 0.8rem 3.4rem !important;
  }
`;

const FormContainer = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const FormField = styled(FormControl)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  background-color: #292929 !important;
  color: white !important;
  width: fit-content !important;
  padding: 1rem 3rem !important;
  border-radius: 5px !important;
  &:hover {
    background-color: #ed1c24 !important;
    color: white !important;
  }
`;

const SelectOption = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const LabelText = styled(Typography)`
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ContactForm = () => {
  //const alert = useAlert();
  const navigate = useNavigate();
  const handleCall = () => {
    window.location.href = "tel:+8240442051";
  };

  const [form, setForm] = React.useState({
    issue: "e-commerce",
    detail: "others",
    language: "english",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/support", form);
      toast.success("Your message has been sent successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <Root>
      <MetaData title={"Contact Us"} />
      <ContactContainer>
        {/* --- Inserted Contact Details --- */}
        <Typography variant="h5" style={{ marginBottom: "1rem" }}>
          Last updated on Sep 6 2025
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "1rem" }}>
          You may contact us using the information below:
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
          <strong>Merchant Legal entity name:</strong> SURAJ SHAW
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
          <strong>Registered Address:</strong> Sahebabad football math dhapa kolkata 700105 North Parganas WEST BENGAL 700105
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
          <strong>Operational Address:</strong> Sahebabad football math dhapa kolkata 700105 North Parganas WEST BENGAL 700105
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
          <strong>Telephone No:</strong> 8240442051
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "1.5rem" }}>
          <strong>E-Mail ID:</strong> producttrust030@gmail.com
        </Typography>
        {/* --- End Inserted Contact Details --- */}

        <Title variant="h2">
          Contact Us
        </Title>

        <DividerContact />

        <HelpTitle variant="h4">
          Need Help?
        </HelpTitle>

        <Para variant="body2">
          We have live chat available, look for the chat icon in the lower right
          hand corner of this page. If it isn’t there, then give us a call at{" "}
          <strong
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleCall}
          >
            8240442051
          </strong>
          .
        </Para>

        <Para variant="body2">
          <span>7:00-6:00 MST Monday-Friday</span>
          <br />
          <span>9:00-4:00 MST Saturday</span>
          <br />
          <span>Closed Sunday</span>
        </Para>

        <Para variant="body2">
          Catch us outside these hours? Fill out our support form below, and
          we'll be in touch shortly.
        </Para>

        <Address variant="body2">
          <span style={{ fontWeight: "500", paddingBottom: "0.5rem" }}>
            ProductTrust Store, Pvt Ltd.
          </span>
          <br />
          15130 Sec 22
          <br />
          Noida, UP 201301
          <br />
          India
        </Address>

        <ButtonGroup>
          <a href="#issue-select" style={{ textDecoration: "none" }}>
            <SupportButton variant="contained">
              Support Form
            </SupportButton>
          </a>

          <CallButton
            variant="contained"
            onClick={handleCall}
          >
            Call Us
          </CallButton>
        </ButtonGroup>

        <DividerContact />
        <div>
          <Title
            variant="h4"
            style={{ paddingBottom: "1rem" }}
          >
            Support Form
          </Title>

          <Para variant="body2">
            Need a quicker answer? Look for our chat icon on the right hand side
            of this page.
          </Para>

          <FormContainer onSubmit={handleSubmit}>
            <SelectOption>
              <LabelText variant="body2">
                ISSUE *
              </LabelText>
              <FormField>
                <Select
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  labelId="issue-label"
                  id="issue-select"
                >
                  <MenuItem value="e-commerce">E-Commerce</MenuItem>
                  <MenuItem value="app">App</MenuItem>
                </Select>
              </FormField>
            </SelectOption>

            <SelectOption>
              <LabelText variant="body2">
                DETAIL *
              </LabelText>
              <FormField>
                <Select
                  name="detail"
                  value={form.detail}
                  onChange={handleChange}
                  labelId="detail-label"
                  id="detail-select"
                >
                  <MenuItem value="availability">Availability</MenuItem>
                  <MenuItem value="return/exchange">Return/Exchange</MenuItem>
                  <MenuItem value="technical-support">
                    Technical Support
                  </MenuItem>
                  <MenuItem value="invoicing">Invoicing</MenuItem>
                  <MenuItem value="tracking-info">Tracking Info</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormField>
            </SelectOption>

            <SelectOption>
              <LabelText variant="body2">
                Language *
              </LabelText>
              <FormField>
                <Select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  labelId="language-label"
                  id="language-select"
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="hindi">Hindi</MenuItem>
                  <MenuItem value="japanese">Japanese</MenuItem>
                  <MenuItem value="chinese">Chinese</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                </Select>
              </FormField>
            </SelectOption>

            <SelectOption>
              <LabelText variant="body2">
                EMAIL *
              </LabelText>
              <FormField>
                <TextField
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email *"
                  id="email-input"
                  type="email"
                />
              </FormField>
            </SelectOption>

            <SelectOption>
              <LabelText variant="body2">
                MESSAGE *
              </LabelText>
              <FormField>
                <TextField
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  id="message-textarea"
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Enter Your Message *"
                />
              </FormField>
            </SelectOption>
            <SubmitButton
              type="submit"
              variant="contained"
            >
              Submit
            </SubmitButton>
          </FormContainer>
        </div>
      </ContactContainer>
    </Root>
  );
};

export default ContactForm;
