import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  Tab,
  Tabs,
  AccordionDetails,
  AccordionSummary,
  AppBar,
} from "@mui/material";
import "./home.css";
import logo from "./img/logo.svg";
import { useState, useEffect } from "react";
import icons from "./constant/icons";
import { CiCircleChevRight } from "react-icons/ci";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { IoIosArrowRoundDown } from "react-icons/io";
import "aos/dist/aos.css";
import Aos from "aos";
import { useAppSelector } from "store/hooks";
import { selectToken } from "pages/auth/slice";
import { Navigate, Link } from "react-router-dom";
import { PATHS } from "Routes/routes.path";
import Head from "common/Head";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Home() {
  const [animate, setAnimate] = useState(false);

  const mobileTheme = useTheme();

  const [value, setValue] = useState(0);

  const [next, setNext] = useState(5);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isMobile = useMediaQuery(mobileTheme.breakpoints.down("md"));

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const token = useAppSelector(selectToken);
  const user = token || window.localStorage.getItem("authToken");

  // const scrollWithOffset = (el: HTMLElement): void => {
  //   const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  //   const yOffset = -100; // Adjust offset value as needed
  //   window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  // };

  const [color, setColor] = useState<boolean>(false);

  const changeColor = (): void => {
    if (window.scrollY >= 60) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const [active_bg, setActive_bg] = useState(icons.hero_bg);

  useEffect(() => {
    if (value === 0) {
      setActive_bg(icons.hero_bg);
    } else if (value === 1) {
      setActive_bg(icons?.mission);
    } else {
      setActive_bg(icons?.faq);
    }
  }, [value]);

  return user ? (
      <Navigate to={PATHS.FEED} replace/>
  ) : (
    <>
      <Head
        title="Landing | Golvia"
        description="Number 1 Sports Social Portfolio Website"
        ogDescription={`Number 1 Sports Social Portfolio Website`}
        ogImage={
          "https://res.cloudinary.com/dywbpyexo/image/upload/v1737095293/Screenshot_2025-01-17_at_7.27.21_AM_kmpgyv.png"
        }
        ogType="article"
        ogUrl={"https://www.golviasports.com"}
      />
      <AppBar
        className={color ? " appbar_bg" : "appbar  "}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          borderBottom: isMobile ? "none" : "0.5px solid #fff",
        }}
      >
        <Box
          sx={{
            height: "100px",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: {
              xl: "75%",
              lg: "85%",
              md: "85%",
              sm: "90%",
              xs: "90%",
            },
            margin: "0 auto",
          }}
        >
          {/* Logo Component */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1.7,

              justifyContent: isMobile ? "center" : "initial",
            }}
          >
            <img src={logo} alt="Golvia_logo" width={40} />

            <Box
              sx={{ overflowX: "hidden", height: "40px" }}
              className="hide_scrollbar"
            >
              <Typography
                className={`text-container ${animate ? "animate" : ""}`}
                sx={{
                  fontSize: "30px",
                  fontWeight: 500,
                  height: "100%",
                  color: "#fff",
                }}
              >
                Golvia
              </Typography>
            </Box>
          </Box>

          {/* Nav Component */}
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
            {!isMobile && (
              <Link to={PATHS.SIGNUP}>
                <Button
                  sx={{
                    fontSize: "16px",
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "initial",
                    borderRadius: "8px",
                    height: "44px",
                    width: "196px",
                  }}
                  endIcon={
                    <CiCircleChevRight
                      style={{ color: "#000", fontSize: "22px" }}
                    />
                  }
                >
                  Create an account
                </Button>
              </Link>
            )}

            <Link to={PATHS.LOGIN}>
              <Button
                sx={{
                  fontSize: "16px",
                  bgcolor: "none",
                  color: "#fff",
                  textTransform: "initial",
                  borderRadius: "8px",
                  height: "44px",
                  width: "96px",
                  border: "1px solid #ffffff",
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </AppBar>
      <Box
        sx={{
          height: { lg: "90vh", md: "90vh", sm: "auto", xs: "auto" },
          backgroundImage: `url(${active_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "primary.main",
          overflow: "hidden",
          pt: { lg: 17, md: 17, sm: 10, xs: 12 },
        }}
      >
        <Box
          sx={{
            width: {
              xl: "75%",
              lg: "85%",
              md: "85%",
              sm: "80%",
              xs: "80%",
            },
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "white",
              mt: 4,
              width: "fit-content",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="inherit"
              sx={{
                "& .MuiTabs-indicator": { backgroundColor: "white" },
                color: "#fff",
              }}
            >
              <Tab label="GOLVIA" {...a11yProps(0)} sx={{ fontSize: "14px" }} />
              <Tab
                label="OUR MISSION"
                {...a11yProps(1)}
                sx={{ fontSize: "14px" }}
              />
              <Tab label="FAQs" {...a11yProps(1)} sx={{ fontSize: "14px" }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 3,
                justifyContent: isMobile ? "center" : "space-between",

                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: { lg: "50%", md: "60%", sm: "100%", xs: "100%" },
                  my: 5,
                  ...(isMobile && {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }),
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: "#fff",
                    fontSize: {
                      lg: "48px",
                      md: "48px",
                      sm: "38px",
                      xs: "32px",
                    },
                    fontWeight: 500,
                    mt: isMobile ? 0 : 4,
                    lineHeight: isMobile ? "45px" : "60px",
                    textAlign: isMobile ? "center" : "left",
                  }}
                  className="animate four"
                >
                  The one social network for <span>A</span>
                  <span>t</span>
                  <span>h</span>
                  <span>l</span>
                  <span>e</span>
                  <span>t</span>
                  <span>es,</span>
                  <span> S</span>
                  <span>c</span>
                  <span>o</span>
                  <span>u</span>
                  <span>t</span>
                  <span>s</span>,<span> C</span>
                  <span>l</span>
                  <span>u</span>
                  <span>b</span>
                  <span>s</span> and <span>F</span>
                  <span>a</span>
                  <span>n</span>
                  <span>s</span> to connect.
                </Typography>
                <Link to={PATHS.SIGNUP}>
                  <Button
                    sx={{
                      mt: isMobile ? 4 : 7,
                      fontSize: isMobile ? "16px" : "20px",
                      width: isMobile ? "210px" : "250px",
                      bgcolor: "#fff",
                      color: "primary",
                      textTransform: "initial",
                      borderRadius: "11px",
                      height: isMobile ? "44px" : "57px",
                    }}
                    endIcon={
                      <CiCircleChevRight
                        style={{ color: "#1D69D8", fontSize: "20px" }}
                      />
                    }
                  >
                    Create an account
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  width: { lg: "40%", md: "40%", sm: "80%", xs: "100%" },
                }}
                data-aos={!isMobile && "fade-left"}
              >
                <Box
                  sx={{
                    background: `url(${icons.board1})`,
                    height: {
                      lg: "500px",
                      md: "500px",
                      sm: "400px",
                      xs: "380px",
                    },
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <Box
                    sx={{
                      margin: "0 auto",
                      height: "100%",
                      mb: -15,
                      width: "100%",
                      p: 1,
                      boxSizing: "border-box",
                    }}
                  ></Box>
                </Box>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box
              id="our_mission"
              sx={{
                margin: "0 auto",
                display: "flex",
                alignItems: "center",

                justifyContent: "space-between",
                mt: 3,
                pb: 8,
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: { lg: "40%", md: "40%", sm: "80%", xs: "90%" },
                  mb: { lg: 0, md: 0, sm: 4, xs: 4 },
                  ...(isMobile && {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }),
                }}
                data-aos="fade-right"
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "40px",
                    fontWeight: 700,
                    fontFamily: "outfit",
                    color: "#fff",
                    display: isMobile ? "none" : "block",
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: {
                      lg: "32px",
                      md: "32px",
                      sm: "28px",
                      xs: "28px",
                    },
                    textAlign: isMobile ? "center" : "left",
                    color: "#fff",
                  }}
                >
                  Our mission is to be The one social media platform for
                  athletes, scouts, clubs, and fans to connect
                </Typography>
                <Link to={PATHS.SIGNUP}>
                  <Button
                    variant="contained"
                    sx={{
                      mt: isMobile ? 4 : 7,
                      textTransform: "initial",
                      borderRadius: "11px",
                      height: isMobile ? "44px" : "57px",
                      fontSize: isMobile ? "16px" : "20px",
                      width: isMobile ? "210px" : "250px",
                      bgcolor: "#fff",
                      color: "#0E809C",
                    }}
                    endIcon={<CiCircleChevRight style={{ color: "#0E809C" }} />}
                  >
                    Create an account
                  </Button>
                </Link>
              </Box>
              <Box
                sx={{
                  width: {
                    lg: "50%",
                    md: "50%",
                    sm: "80%",
                    xs: "100%",
                  },

                  display: "flex",

                  alignItems: "center",
                  justifyContent: "right",
                  ...(isMobile && {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "right",
                  }),
                }}
                data-aos={!isMobile && "fade-up"}
                // align={isMobile && "center"}
              >
                <img src={icons.board2} width={isMobile ? "100%" : "70%"} />
              </Box>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
                pb: 8,

                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                },
                height: isMobile ? "auto" : "60vh",
              }}
            >
              <Box
                className="hide_scrollbar"
                sx={{
                  width: {
                    xl: "40%",
                    lg: "40%",
                    md: "40%",
                    sm: "90%",
                    xs: "90%",
                  },
                  height: "100%",
                  overflow: "scroll",
                }}
                data-aos="fade-up"
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: isMobile ? "32px" : "40px",
                  }}
                >
                  FAQs
                </Typography>
                {isMobile ? (
                  <Box sx={{ mt: isMobile ? 1 : 3 }}>
                    {faqs?.map((faq, index) => (
                      <Accordion
                        sx={{
                          border: "0.5px solid #fff",
                          bgcolor: "transparent",
                          mb: 2,
                          borderRadius: "10px",
                          boxShadow: "none",
                          color: "#fff",
                          "&::before": { height: "0px" },
                        }}
                        key={index}
                      >
                        <AccordionSummary
                          sx={{ borderRadius: "10px" }}
                          expandIcon={
                            <IoIosArrowRoundDown style={{ color: "#fff" }} />
                          }
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography
                            sx={{ fontSize: isMobile ? "14px" : "26px" }}
                          >
                            {" "}
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{ fontSize: isMobile ? "14px" : "26px" }}
                          >
                            {" "}
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ mt: isMobile ? 1 : 3 }}>
                    {faqs.slice(next - 5, next).map((faq, index) => (
                      <Accordion
                        sx={{
                          border: "0.5px solid #fff",
                          bgcolor: "transparent",
                          mb: 2,
                          borderRadius: "10px",
                          boxShadow: "none",
                          color: "#fff",
                          "&::before": { height: "0px" },
                        }}
                        key={index}
                      >
                        <AccordionSummary
                          sx={{ borderRadius: "10px" }}
                          expandIcon={
                            <IoIosArrowRoundDown style={{ color: "#fff" }} />
                          }
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography
                            sx={{ fontSize: isMobile ? "14px" : "26px" }}
                          >
                            {" "}
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{ fontSize: isMobile ? "14px" : "26px" }}
                          >
                            {" "}
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: 3,
                        pt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          height: "4px",
                          width: "100px",
                          bgcolor: "#ffffff80",
                          cursor: "pointer",
                          ...(next === 5 && {
                            bgcolor: "#fff",
                          }),
                        }}
                        onClick={() => setNext(5)}
                      />
                      <Box
                        sx={{
                          height: "4px",
                          width: "100px",
                          bgcolor: "#ffffff80",
                          cursor: "pointer",
                          ...(next > 5 && {
                            bgcolor: "#fff",
                          }),
                        }}
                        onClick={() => setNext(10)}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",

                  mt: isMobile ? 4 : -5,
                  ...(isMobile && {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }),
                }}
                data-aos={!isMobile && "fade-down"}
              >
                <img src={icons.board3} width={"90%"} />
              </Box>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>

      {/* FOOTER =======================================================
==================================================================== */}

      <Box
        sx={{
          bgcolor: "#EAF1FD",
          height: { lg: "10vh", md: "10vh", sm: "auto", xs: "auto" },
        }}
      >
        <Box
          sx={{
            width: {
              xl: "75%",
              lg: "85%",
              md: "85%",
              sm: "90%",
              xs: "95%",
            },
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            rowGap: 3,
            py: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <img src={icons.logo} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#000" }}>
              Golvia
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "10px", textAlign: "center" }}>
              Connecting athletes to opportunities worldwide
            </Typography>
            <Typography sx={{ fontSize: "10px", textAlign: "center" }}>
              All right reserved (c) {new Date().getFullYear()}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <a
              href="https://www.tiktok.com/@golvia.inc?_t=8r2Vggezxqf&_r=1"
              target="_blank"
            >
              <IconButton
                sx={{
                  bgcolor: "#000",
                  width: "45px",
                  height: "45px",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <IoLogoTiktok style={{ color: "#fff", fontSize: "16px" }} />
              </IconButton>
            </a>
            <a
              href="https://x.com/golviainc?s=21&t=2nIXkIYuYLkXKsBnW3vkuA"
              target="_blank"
            >
              <IconButton
                sx={{
                  bgcolor: "#000",
                  width: "45px",
                  height: "45px",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <FaXTwitter style={{ color: "#fff", fontSize: "16px" }} />
              </IconButton>
            </a>
            <a
              href="https://www.instagram.com/golvia.in?igsh=MTNsMmdqdHEzem9qdg%3D%3D&utm_source=qr"
              target="_blank"
            >
              <IconButton
                sx={{
                  bgcolor: "#000",
                  width: "45px",
                  height: "45px",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <FaInstagram style={{ color: "#fff", fontSize: "16px" }} />
              </IconButton>
            </a>
            <a
              href="https://www.linkedin.com/company/golvia-inc/posts/?feedView=all"
              target="_blank"
            >
              <IconButton
                sx={{
                  bgcolor: "#000",
                  width: "45px",
                  height: "45px",
                  transition: "0.2s all linear",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <FaLinkedinIn style={{ color: "#fff", fontSize: "16px" }} />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

const faqs = [
  {
    question: "What is Golvia?",
    answer:
      "Golvia is a new social media platform specifically designed for athletes, coaches, academies, scouts, agents, sports enthusiasts, and fans. It aims to create a focused and supportive community where users can connect, showcase their talents, and collaborate without the distractions often found on traditional social media platforms. 'Gol-Via' means 'Goal Through' and signifies 'Score Your Dream Goal.'",
  },
  // {
  //   question: "How is Golvia different from other social media platforms?",
  //   answer:
  //     "Unlike existing platforms that can be noisy and overwhelming, Golvia offers a tailored experience for the sports community. It prioritizes athlete development, networking opportunities, and meaningful interactions. Users can easily connect with other athletes, coaches, and sports organizations, fostering a community that supports growth and collaboration.",
  // },
  {
    question: "Who can join Golvia?",
    answer:
      "Golvia is open to anyone involved in the sports community, including athletes,  scouts, sport merchants, clubs &  sports organizations, and fans. Whether you're a professional athlete or just starting your journey in sports, Golvia provides a space for everyone.",
  },
  {
    question: "What features does Golvia offer?",
    answer:
      "Golvia includes features such as: Profile Creation (Showcase your skills, achievements, and sports journey), Networking Opportunities (Connect with coaches, scouts, and other athletes), Talent Showcasing (Share videos, photos, and updates about your sports activities), Collaboration Tools (Engage with fellow athletes and coaches for training, advice, and partnership opportunities), and a Marketplace (Connect with sports businesses for gear, training, and other resources).",
  },
  {
    question: "How do I create an account on Golvia?",
    answer:
      "To create an account, simply visit our website at www.gol-via.com or download the Golvia app from your app store. Follow the prompts to set up your profile and start connecting with the sports community.",
  },
  {
    question: "Is Golvia free to use?",
    answer:
      "Yes, Golvia offers a free membership option that provides access to basic features. We may also introduce premium features in the future for enhanced user experiences.",
  },
  {
    question: "How does Golvia ensure a safe and positive environment?",
    answer:
      "Golvia is committed to maintaining a safe and respectful environment. We implement community guidelines, moderation practices, and user reporting tools to address inappropriate behavior and ensure a positive experience for all users.",
  },
  {
    question: "Can businesses join Golvia?",
    answer:
      "Absolutely! Sports-related businesses can create profiles to connect with athletes and promote their products and services. This feature helps businesses reach their target audience within the sports community.",
  },
  // {
  //   question: "How can I provide feedback or suggestions for Golvia?",
  //   answer:
  //     "We value user feedback! You can send your suggestions or inquiries through our contact form on the website or by reaching out to our support team at support@gol-via.com.",
  // },
  // {
  //   question: "When will Golvia be officially launched?",
  //   answer:
  //     "We are excited to announce that Golvia is set to launch on December 1, 2024. Stay tuned for updates and be among the first to join our community!",
  // },
  // {
  //   question: "Can monetization be added on Golvia?",
  //   answer:
  //     "Yes, monetization features will be added to Golvia in the future. We recognize the importance of providing opportunities for athletes and content creators to generate income from their engagements on the platform. This may include options like sponsored content, partnerships with brands, merchandise sales, and premium membership subscriptions. We are committed to evolving Golvia to meet the needs of our users and create a sustainable ecosystem that benefits the sports community. Stay tuned for updates on these exciting features!",
  // },
];
