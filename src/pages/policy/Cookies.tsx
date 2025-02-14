import React from "react";
import { Typography } from "@mui/material";

const Cookies = () => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{ color: "#000", fontWeight: 600, fontSize: "40px" }}
        gutterBottom
      >
        Cookie Policy
      </Typography>
      <ol>
        <li>
          <Typography variant="h6">Introduction</Typography>
          <Typography variant="body1">
            This Cookie Policy explains how Golvia ("we", "us", or "our") uses cookies and similar
            technologies to recognize you when you visit our website at [Insert Website URL]
            ("Website"). It explains what these technologies are and why we use them, as well as
            your rights to control our use of them.
          </Typography>
        </li>

        <li>
          <Typography variant="h6">What are cookies?</Typography>
          <Typography variant="body1">
            Cookies are small data files that are placed on your computer or mobile device when you
            visit a website. Cookies are widely used by website owners in order to make their
            websites work, or to work more efficiently, as well as to provide reporting information.
          </Typography>
        </li>

        <li>
          <Typography variant="h6">Why do we use cookies?</Typography>
          <Typography variant="body1">
            We use first-party and third-party cookies for several reasons. Some cookies are
            required for technical reasons in order for our Website to operate, and we refer to
            these as "essential" or "strictly necessary" cookies. Other cookies enable us to track
            and target the interests of our users to enhance the experience on our Website. Third
            parties serve cookies through our Website for advertising, analytics, and other
            purposes.
          </Typography>
        </li>

        <li>
          <Typography variant="h6">Types of cookies we use</Typography>
          <Typography variant="body1">
            The specific types of first and third-party cookies served through our Website and the
            purposes they perform are described below:
          </Typography>

          <ol type="A">
            <li>
              <Typography variant="subtitle1">Essential Website Cookies</Typography>
              <Typography variant="body2">
                These cookies are strictly necessary to provide you with services available through
                our Website and to use some of its features, such as access to secure areas.
              </Typography>
            </li>

            <li>
              <Typography variant="subtitle1">Performance and Functionality Cookies</Typography>
              <Typography variant="body2">
                These cookies are used to enhance the performance and functionality of our Website
                but are non-essential to their use. However, without these cookies, certain
                functionality may become unavailable.
              </Typography>
            </li>

            <li>
              <Typography variant="subtitle1">Analytics and Customization Cookies</Typography>
              <Typography variant="body2">
                These cookies collect information that is used either in aggregate form to help us
                understand how our Website is being used or how effective our marketing campaigns
                are, or to help us customize our Website for you.
              </Typography>
            </li>

            <li>
              <Typography variant="subtitle1">Advertising Cookies</Typography>
              <Typography variant="body2">
                These cookies are used to make advertising messages more relevant to you. They
                perform functions like preventing the same ad from continuously reappearing,
                ensuring that ads are properly displayed for advertisers, and in some cases
                selecting advertisements that are based on your interests.
              </Typography>
            </li>

            <li>
              <Typography variant="subtitle1">Social Networking Cookies</Typography>
              <Typography variant="body2">
                These cookies are used to enable you to share pages and content that you find
                interesting on our Website through third-party social networking and other websites.
                These cookies may also be used for advertising purposes.
              </Typography>
            </li>
          </ol>
        </li>

        <li>
          <Typography variant="h6">How can I control cookies?</Typography>
          <Typography variant="body1">
            You have the right to decide whether to accept or reject cookies. You can exercise your
            cookie preferences by clicking on the appropriate opt-out links provided in the cookie
            banner or below.
          </Typography>
          <Typography variant="body1">
            You can set or amend your web browser controls to accept or refuse cookies. If you
            choose to reject cookies, you may still use our website though your access to some
            functionality and areas of our website may be restricted. As the means by which you can
            refuse cookies through your web browser controls vary from browser-to-browser, you
            should visit your browser's help menu for more information.
          </Typography>
          <Typography variant="body1">
            In addition, most advertising networks offer you a way to opt out of targeted
            advertising. If you would like to find out more information, please visit{" "}
            <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices</a> or{" "}
            <a href="http://www.youronlinechoices.com">http://www.youronlinechoices.com</a>.
          </Typography>
        </li>

        <li>
          <Typography variant="h6">How often will you update this Cookie Policy?</Typography>
          <Typography variant="body1">
            We may update this Cookie Policy from time to time in order to reflect, for example,
            changes to the cookies we use or for other operational, legal or regulatory reasons.
            Please therefore re-visit this Cookie Policy regularly to stay informed about our use of
            cookies and related technologies.
          </Typography>
          <Typography variant="body1">
            The date at the top of this Cookie Policy indicates when it was last updated.
          </Typography>
        </li>

        <li>
          <Typography variant="h6">Where can I get further information?</Typography>
          <Typography variant="body1">
            If you have any questions about our use of cookies or other technologies, please email
            us at <a href="mailto:support@gol-via.com">support@gol-via.com</a>.
          </Typography>
        </li>
      </ol>
    </>
  );
};

export default Cookies;
