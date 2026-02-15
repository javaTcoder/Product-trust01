import React from "react";
import { Typography, Container, Grid, Button, Box } from "@mui/material";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";
import { Link } from "react-router-dom";

const About_UsPage = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: "8rem",
          paddingBottom: "4rem",
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MetaData title={"About Us"} />
        <Container sx={{ padding: "2rem", textAlign: "center", backgroundColor: "white", maxWidth: "100%" }}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <img
                src={TermsImage}
                alt="ProductTrust"
                style={{
                  width: "100%",
                  height: "auto",
                  marginTop: "3rem",
                  marginBottom: "2rem",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: "#414141",
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  fontFamily: "Roboto",
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "800px",
                  lineHeight: "1.7",
                  margin: "1.5rem auto",
                  color: "#292929",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  textAlign: "justify",
                  padding: "0.8rem 1rem",
                }}
              >
                Welcome to <b>ProductTrust</b>, the official home of the <b>NEXT TOPPER T-shirt</b> — a powerful symbol of motivation, dreams, and ambition for every student with a purpose.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ padding: "2rem", textAlign: "center", backgroundColor: "white", maxWidth: "100%" }}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#ed1c24",
              margin: "2rem 0 1rem 0",
              fontFamily: "Roboto",
            }}
            component="h2"
          >
            🎯 Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              lineHeight: "1.7",
              margin: "1.5rem auto",
              color: "#292929",
              fontSize: "1.15rem",
              fontWeight: 400,
              textAlign: "justify",
              padding: "0.8rem 1rem",
            }}
          >
            We started ProductTrust with one big goal: <b>To create a clothing brand that motivates students every single day — not just with words, but with what they wear.</b>
            <br /><br />
            Our T-shirts aren't just fashion. They are a statement. Every NEXT TOPPER shirt is designed to remind you of your goal — whether it's cracking the IIT, becoming an IPS officer, or chasing any big dream.
          </Typography>
        </Container>

        <Container sx={{ padding: "2rem", textAlign: "center", backgroundColor: "white", maxWidth: "100%" }}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#ed1c24",
              margin: "2rem 0 1rem 0",
              fontFamily: "Roboto",
            }}
            component="h2"
          >
            👕 What Makes Us Different?
          </Typography>
          <ul
            style={{
              textAlign: "left",
              margin: "1rem auto 1.5rem auto",
              maxWidth: 700,
              paddingLeft: "1.5rem",
              color: "#292929",
              fontSize: "1.08rem",
              lineHeight: 1.7,
            }}
          >
            <li>✅ <b>High-Quality T-Shirts</b> that are soft, durable, and comfortable</li>
            <li>💸 <b>Affordable Prices</b> — so motivation never costs too much</li>
            <li>🎨 <b>Unique Motivational Designs</b> made especially for students</li>
            <li>🇮🇳 <b>Made in India</b>, made with passion</li>
            <li>🚚 <b>Fast Delivery</b> across India & internationally</li>
            <li>💰 <b>Cash on Delivery (COD)</b> available</li>
            <li>🕒 <b>24/7 Customer Support</b> — we're always here to help</li>
          </ul>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              lineHeight: "1.7",
              margin: "1.5rem auto",
              color: "#292929",
              fontSize: "1.15rem",
              fontWeight: 400,
              textAlign: "justify",
              padding: "0.8rem 1rem",
            }}
          >
            We believe every student has the potential to be the NEXT TOPPER — and sometimes, all it takes is a daily reminder printed right on your chest.
          </Typography>
        </Container>

        <Container sx={{ padding: "2rem", textAlign: "center", backgroundColor: "white", maxWidth: "100%" }}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#ed1c24",
              margin: "2rem 0 1rem 0",
              fontFamily: "Roboto",
            }}
            component="h2"
          >
            💬 Who Is It For?
          </Typography>
          <ul
            style={{
              textAlign: "left",
              margin: "1rem auto 1.5rem auto",
              maxWidth: 700,
              paddingLeft: "1.5rem",
              color: "#292929",
              fontSize: "1.08rem",
              lineHeight: 1.7,
            }}
          >
            <li>Students with big dreams</li>
            <li>Learners preparing for competitive exams</li>
            <li>Anyone who believes in self-belief and hustle</li>
          </ul>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              lineHeight: "1.7",
              margin: "1.5rem auto",
              color: "#292929",
              fontSize: "1.15rem",
              fontWeight: 400,
              textAlign: "justify",
              padding: "0.8rem 1rem",
            }}
          >
            If you're someone who wakes up thinking "I will make it!", then this brand is made just for you.
          </Typography>
        </Container>

        <Container sx={{ padding: "2rem", textAlign: "center", backgroundColor: "white", maxWidth: "100%" }}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#ed1c24",
              margin: "2rem 0 1rem 0",
              fontFamily: "Roboto",
            }}
            component="h2"
          >
            🤝 Trust. Motivation. Style.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              lineHeight: "1.7",
              margin: "1.5rem auto",
              color: "#292929",
              fontSize: "1.15rem",
              fontWeight: 400,
              textAlign: "justify",
              padding: "0.8rem 1rem",
            }}
          >
            At ProductTrust, we're not just selling clothes —<br />
            We're building a movement of dreamers, believers, and achievers.
            <br /><br />
            Thank you for being part of this journey.<br />
            <b>Let's rise. Let's inspire. Let's become the NEXT TOPPER.</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem 0",
              width: "100%",
              marginTop: "1rem",
              gap: "1.5rem",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  color: "white",
                  padding: "0.8rem 2rem",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#ed1c24",
                    color: "white",
                  },
                }}
              >
                Our Products
              </Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#292929",
                  color: "white",
                  padding: "0.8rem 2rem",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#ed1c24",
                    color: "white",
                  },
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About_UsPage;