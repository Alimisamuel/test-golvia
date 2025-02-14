import {
  Box,
  Divider,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SettingsLayout from "layouts/SettingsLayout";
import { IoIosArrowRoundDown } from "react-icons/io";

const Faqs = () => {
  return (
    <SettingsLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingY={4}
        paddingX={{ xs: 2, md: 6 }}
      >
        <Typography variant="h$24" className="font-medium">
          FAQS
        </Typography>
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />
      <Box paddingX={{ xs: 2, md: 6 }}>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 700 }}>For Athletes</Typography>
          <Box sx={{ mt: 2 }}>
            {faqs.map((faq, index) => (
              <Accordion
                sx={{
                  border: "0.5px solid #B4B4B4",
                  mb: 2,
                  borderRadius: "10px",
                  boxShadow: "none",
                  "&::before": { height: "0px" },
                }}
                key={index}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  expandIcon={<IoIosArrowRoundDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography> {faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
        <Divider className="w-screen !ml-[-50px]" />
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 700 }}>For Scouts</Typography>
          <Box sx={{ mt: 2 }}>
            {Scoutfaqs.map((faq, index) => (
              <Accordion
                sx={{
                  border: "0.5px solid #B4B4B4",
                  mb: 2,
                  borderRadius: "10px",
                  boxShadow: "none",
                  "&::before": { height: "0px" },
                }}
                key={index}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  expandIcon={<IoIosArrowRoundDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography> {faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
        <Divider className="w-screen !ml-[-50px]" />
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 700 }}>For Clubs/Team</Typography>
          <Box sx={{ mt: 2 }}>
            {Clubfaqs.map((faq, index) => (
              <Accordion
                sx={{
                  border: "0.5px solid #B4B4B4",
                  mb: 2,
                  borderRadius: "10px",
                  boxShadow: "none",
                  "&::before": { height: "0px" },
                }}
                key={index}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  expandIcon={<IoIosArrowRoundDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography> {faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
        <Divider className="w-screen !ml-[-50px]" />
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 700 }}>For Fans</Typography>
          <Box sx={{ mt: 2 }}>
            {FanFaq.map((faq, index) => (
              <Accordion
                sx={{
                  border: "0.5px solid #B4B4B4",
                  mb: 2,
                  borderRadius: "10px",
                  boxShadow: "none",
                  "&::before": { height: "0px" },
                }}
                key={index}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  expandIcon={<IoIosArrowRoundDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography> {faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
        <Divider className="w-screen !ml-[-50px]" />
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 700 }}>For Marketplace</Typography>
          <Box sx={{ mt: 2 }}>
            {MarketFaq.map((faq, index) => (
              <Accordion
                sx={{
                  border: "0.5px solid #B4B4B4",
                  mb: 2,
                  borderRadius: "10px",
                  boxShadow: "none",
                  "&::before": { height: "0px" },
                }}
                key={index}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  expandIcon={<IoIosArrowRoundDown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography> {faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> {faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
    </SettingsLayout>
  );
};

export default Faqs;

const faqs = [
  {
    question: "How can I showcase my skills on Golvia?",
    answer:
      "You can create a detailed profile, upload performance videos, and add stats, achievements, and other relevant details to stand out to scouts, clubs, and fans.",
  },

  {
    question: "Can I earn money on Golvia?",
    answer:
      "Yes, monetization features will be added to Golvia in the future. We recognize the importance of providing opportunities for athletes and content creators to generate income from their engagements on the platform. This may include options like sponsored content, partnerships with brands, merchandise sales, and premium membership subscriptions. We are committed to evolving Golvia to meet the needs of our users and create a sustainable ecosystem that benefits the sports community. Stay tuned for updates on these exciting features!",
  },
  {
    question: "How can I connect with scouts and clubs?",
    answer:
      "Scouts and clubs can view your profile and performance videos. If interested, they can reach out to you directly through the platform’s messaging system.",
  },
  {
    question: "How do I know if someone is interested in me?",
    answer:
      "You’ll receive notifications when someone favorites your profile, sends a message, or interacts with your listings on the marketplace.",
  },
  {
    question: "What sports does Golvia support for athletes?",
    answer:
      "Golvia embraces all sports, launching its pilot phase with 20 different sports, which includes; football, basketball, tennis, athletics, and more. It provides a comprehensive platform for athletes and sports enthusiasts to connect, engage, and thrive across a wide range of sports.",
  },
  {
    question: " Can I track how my profile is performing?",
    answer:
      "Yes, Golvia provides analytics dashboards that show how often your profile is viewed, how many scouts or clubs have interacted with you, and other key metrics.",
  },
  {
    question: "Can businesses join Golvia?",
    answer:
      "Absolutely! Sports-related businesses can create profiles to connect with athletes and promote their products and services. This feature helps businesses reach their target audience within the sports community.",
  },
  {
    question: "How can I provide feedback or suggestions for Golvia?",
    answer:
      "We value user feedback! You can send your suggestions or inquiries through our contact form on the website or by reaching out to our support team at support@gol-via.com.",
  },
];

const Scoutfaqs = [
  {
    question: "How can I find talented athletes on Golvia?",
    answer:
      "You can use Golvia’s advanced search filters to discover athletes based on their sport, location, skill level, and other criteria.",
  },

  {
    question: "Can I watch performance videos before contacting athletes?",
    answer:
      "Yes, athletes upload performance videos to their profiles, allowing you to assess their skills before reaching out.",
  },
  {
    question: "How do I contact an athlete I’m interested in?",
    answer:
      "After identifying an athlete, you can connect with them directly through the platform by sending a message to discuss opportunities. Additionally, you can mark their profile as a favorite and continue to track their progress and updates.",
  },
  {
    question: "Can I save profiles for future reference?",
    answer: "Yes, you can favorite athlete profiles to save them and easily access them later.",
  },
  {
    question: "Does Golvia support all sports?",
    answer:
      "Golvia embraces all sports, launching its pilot phase with 20 different sports, which includes; football, basketball, tennis, athletics, and more. It provides a comprehensive platform for athletes and sports enthusiasts to connect, engage, and thrive across a wide range of sports.",
  },
  {
    question: " Are there tools to help me compare athletes?",
    answer:
      "Golvia provides analytics and performance dashboards to help you evaluate and compare athletes’ skills and potential.",
  },
];

const Clubfaqs = [
  {
    question: "How can clubs recruit athletes through Golvia?",
    answer:
      "Clubs can browse athlete profiles, watch their performance videos, and contact them directly to discuss recruitment opportunities.",
  },

  {
    question: "Can clubs post recruitment needs on Golvia?",
    answer:
      "Yes, Golvia allows clubs to post specific recruitment needs, making it easier to find athletes that match their requirements.",
  },
  {
    question: "How can we evaluate an athlete’s potential?",
    answer:
      "The platform includes performance videos, stats, and analytics to help clubs make informed decisions about potential recruits.",
  },
  {
    question: "Can clubs connect with scouts through Golvia?",
    answer:
      "Yes, Golvia fosters connections not only with athletes but also with scouts to create a broader talent pipeline.",
  },
  {
    question: "What sports are available for clubs to explore?",
    answer:
      "Golvia supports 20 sports during its pilot phase, with plans to expand to all sports in the future.",
  },
  {
    question: " Are there premium features for clubs?",
    answer:
      "Yes, Golvia offers premium features such as advanced search filters, enhanced visibility for postings, and access to detailed analytics.",
  },
];
const FanFaq = [
  {
    question: " How can I follow my favorite athletes on Golvia?",
    answer:
      "You can favorite athletes’ profiles to receive updates and stay connected with their progress and achievements.",
  },

  {
    question: "Can fans watch athlete performance videos?",
    answer:
      "Yes, fans have access to performance videos and other content shared by athletes on their profiles.",
  },
  {
    question: "Is Golvia free for fans?",
    answer:
      "Golvia is free to use, but certain premium features or exclusive content may require a subscription.",
  },
  {
    question: "How can fans engage with athletes?",
    answer:
      "Fans can like, comment on, and share content from their favorite athletes to show support and interact with the community.",
  },
  {
    question: "Does Golvia provide content for all sports?",
    answer:
      "Yes, Golvia supports 20 sports during its pilot phase, offering diverse content for fans of various sports.",
  },
  {
    question: " Can fans buy sports-related services or merchandise on Golvia?",
    answer:
      "Yes, Golvia’s marketplace allows fans to purchase services such as training sessions, merchandise, or exclusive content directly from athletes.",
  },
];
const MarketFaq = [
  {
    question: "What is the Golvia Marketplace?",
    answer:
      "The Golvia Marketplace is a platform where athletes,scouts, clubs, fans, and businesses can buy and sell services, merchandise, and other sports-related offerings.",
  },

  {
    question: "What can athletes sell on the marketplace?",
    answer:
      "Athletes can offer services like training sessions, personalized videos, merchandise, or access to exclusive content.",
  },
  {
    question: "Can businesses or brands use the marketplace?",
    answer:
      "Yes, brands and businesses can list products, sponsor athletes, or collaborate on sports-related campaigns within the marketplace.",
  },
  {
    question: "How are transactions handled on the marketplace?",
    answer:
      "Transactions are processed securely through the Golvia payment gateway (Gol-coin). Funds are transferred to your preferred payment method after a successful transaction.",
  },
  {
    question: "Are there fees for using the marketplace?",
    answer:
      "While creating a listing is free, Golvia may charge a small transaction fee for completed sales or offer premium listing options for greater visibility..",
  },
  {
    question: " How do I promote my listings on the marketplace?",
    answer:
      "You can use Golvia’s promotional tools to feature your listings, improve visibility, and reach a wider audience.",
  },
];
