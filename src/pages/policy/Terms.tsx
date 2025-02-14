import React from "react";
import { Typography } from "@mui/material";

const Terms = () => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{ color: "#000", fontWeight: 600, fontSize: "40px" }}
        gutterBottom
      >
        Terms of Use
      </Typography>
      <ol>
        <li>
          <Typography variant="h6">Acceptance of Terms</Typography>
          <Typography>
            By accessing or using the Golvia platform ("Service"), you agree to be bound by these
            Terms of Use ("Terms"). If you disagree with any part of the terms, you may not access
            the Service.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Changes to Terms</Typography>
          <Typography>
            We reserve the right to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking
            effect.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Access to the Service</Typography>
          <ol type="a">
            <li>
              <Typography>
                To access Golvia, you may be asked to provide certain registration details or other
                information. It is a condition of your use of the Service that all the information
                you provide is correct, current, and complete.
              </Typography>
            </li>
            <li>
              <Typography>
                You agree not to access the Service by any means other than through the interface
                that is provided by Golvia for use in accessing the Service.
              </Typography>
            </li>
          </ol>
        </li>
        <li>
          <Typography variant="h6">User Account</Typography>
          <ol type="a">
            <li>
              <Typography>
                You are responsible for safeguarding the password that you use to access the Service
                and for any activities or actions under your password.
              </Typography>
            </li>
            <li>
              <Typography>
                You agree not to disclose your password to any third party. You must notify us
                immediately upon becoming aware of any breach of security or unauthorized use of
                your account.
              </Typography>
            </li>
          </ol>
        </li>
        <li>
          <Typography variant="h6">User Content</Typography>
          <ol type="a">
            <li>
              <Typography>
                You retain all of your ownership rights in your content. By posting content to the
                Service, you grant us a worldwide, non-exclusive, royalty-free license to use,
                reproduce, modify, publish, distribute, and display such content.
              </Typography>
            </li>
            <li>
              <Typography>
                You represent and warrant that you own or have the necessary rights to post the
                content you submit; and that the content does not violate the privacy rights,
                publicity rights, copyrights, contract rights or any other rights of any person.
              </Typography>
            </li>
          </ol>
        </li>
        <li>
          <Typography variant="h6">Prohibited Uses</Typography>
          <Typography>You agree not to use the Service:</Typography>
          <ol type="a">
            <li>
              <Typography>To violate any applicable laws or regulations.</Typography>
            </li>
            <li>
              <Typography>
                To impersonate any person or entity or falsely state or misrepresent your
                affiliation with a person or entity.
              </Typography>
            </li>
            <li>
              <Typography>
                To transmit any unsolicited or unauthorized advertising, promotional materials,
                spam, or any other form of solicitation.
              </Typography>
            </li>
            <li>
              <Typography>
                To transmit any material that contains viruses, Trojan horses, or any other
                malicious code.
              </Typography>
            </li>
          </ol>
        </li>
        <li>
          <Typography variant="h6">Intellectual Property</Typography>
          <Typography>
            The Service and its original content (excluding content provided by users), features,
            and functionality are and will remain the exclusive property of Golvia and its
            licensors.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Termination</Typography>
          <Typography>
            We may terminate or suspend your account immediately, without prior notice or liability,
            for any reason whatsoever, including without limitation if you breach the Terms.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Limitation of Liability</Typography>
          <Typography>
            In no event shall Golvia, nor its directors, employees, partners, agents, suppliers, or
            affiliates, be liable for any indirect, incidental, special, consequential, or punitive
            damages, including without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or inability to access or use
            the Service.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Governing Law</Typography>
          <Typography>
            These Terms shall be governed and construed in accordance with the laws of Nigeria,
            without regard to its conflict of law provisions.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Dispute Resolution</Typography>
          <Typography>
            Any disputes arising out of or related to these Terms or the Service will be subject to
            the exclusive jurisdiction of the courts located within Nigeria.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Severability</Typography>
          <Typography>
            If any provision of these Terms is held to be unenforceable or invalid, such provision
            will be changed and interpreted to accomplish the objectives of such provision to the
            greatest extent possible under applicable law and the remaining provisions will continue
            in full force and effect.
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography>
            Golvia [Insert Address] Email: [Insert Email] Phone: [Insert Phone Number]
          </Typography>
        </li>
      </ol>
    </>
  );
};

export default Terms;
