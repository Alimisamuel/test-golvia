import { Box, Typography } from "@mui/material";
import React from "react";

const Privacy = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ color: "#000", fontWeight: 600, fontSize: "40px" }}
        gutterBottom
      >
        Privacy Policy
      </Typography>

      <ol>
        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Introduction
          </Typography>
          <Typography paragraph>
            Welcome to Golvia ("we," "our," or "us"). We are committed to protecting your privacy
            and personal data. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our professional networking platform.
          </Typography>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Compliance with Data Protection Laws
          </Typography>
          <Typography paragraph>
            This Privacy Policy is designed to comply with relevant data protection laws, including:
          </Typography>
          <ol>
            <li>Nigeria Data Protection Regulation (NDPR)</li>
            <li>European Union General Data Protection Regulation (GDPR)</li>
          </ol>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Information We Collect
          </Typography>
          <Typography paragraph>We collect the following types of information:</Typography>
          <Typography variant="subtitle1" gutterBottom>
            3.1 Personal Information You Provide:
          </Typography>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Professional history</li>
            <li>Educational background</li>
            <li>Profile picture</li>
            <li>Skills and endorsements</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <Typography variant="subtitle1" gutterBottom>
            3.2 Information Automatically Collected:
          </Typography>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Log data</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography paragraph>We use your information for the following purposes:</Typography>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To fulfill any other purpose for which you provide it</li>
          </ul>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Data Retention
          </Typography>
          <Typography paragraph>
            We will retain your personal data only for as long as necessary for the purposes set out
            in this Privacy Policy. We will retain and use your data to the extent necessary to
            comply with our legal obligations, resolve disputes, and enforce our policies.
          </Typography>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Data Transfer
          </Typography>
          <Typography paragraph>
            Your information, including personal data, may be transferred to — and maintained on —
            computers located outside of your state, province, country, or other governmental
            jurisdiction where the data protection laws may differ from those of your jurisdiction.
          </Typography>
          <Typography paragraph>
            If you are located outside Nigeria and choose to provide information to us, please note
            that we transfer the data, including personal data, to Nigeria and process it there.
          </Typography>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Your Data Protection Rights
          </Typography>
          <Typography paragraph>Under the NDPR and GDPR, you have the following rights:</Typography>
          <ul>
            <li>The right to access, update or delete the information we have on you</li>
            <li>The right of rectification</li>
            <li>The right to object</li>
            <li>The right of restriction</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Security of Your Personal Information
          </Typography>
          <Typography paragraph>
            We use appropriate technical and organizational measures to protect your personal
            information. However, no method of transmission over the Internet or method of
            electronic storage is 100% secure.
          </Typography>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Changes to This Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Typography>
        </li>

        <li style={{ listStyleType: "number" }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography>
            Golvia <br />
            Email: support@gol-via.com <br />
            Phone: +234--------------
          </Typography>
        </li>
      </ol>
    </Box>
  );
};

export default Privacy;
