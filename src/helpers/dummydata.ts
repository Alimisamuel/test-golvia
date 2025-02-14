import Manchester from "../assets/dummy_club_img/manchester.svg";
import Barcelona from "../assets/dummy_club_img/barcelona.svg";
import Tottenham from "../assets/dummy_club_img/tottenham.svg";
import Arsenal from "../assets/dummy_club_img/arsenal.svg";
import Avartar1 from "../assets/dummy_avatar_img/avatar_img.svg";
import Avartar2 from "../assets/dummy_avatar_img/avatar_img2.svg";
import Avartar3 from "../assets/dummy_avatar_img/avatar_img3.svg";
import Avartar4 from "../assets/dummy_avatar_img/avatar_mg4.svg";
import FootballPlaying from "../assets/imgs/football-playing.svg";

export const DummyClubData = [
  {
    id: 1,
    name: "Manchester United",
    teamLogo: Manchester,
    followers: 23000,
    isVerified: true,
  },
  {
    id: 2,
    name: "Barcelona",
    teamLogo: Barcelona,
    followers: 18000,
    isVerified: true,
  },
  {
    id: 3,
    name: "Arsenal FC",
    teamLogo: Arsenal,
    followers: 19000,
    isVerified: true,
  },
  {
    id: 4,
    name: "Tottenham Hotspur",
    teamLogo: Tottenham,
    followers: 19000,
    isVerified: true,
  },
  {
    id: 5,
    name: "Tottenham Hotspur",
    teamLogo: Tottenham,
    followers: 19000,
    isVerified: true,
  },
];

export const DummyAgentData = [
  {
    id: 1,
    name: "James Madison",
    profilePicture: Avartar1,
    followers: 143000,
  },
  {
    id: 2,
    name: "James Madison",
    profilePicture: Avartar2,
    followers: 143000,
  },
  {
    id: 3,
    name: "Nelson Mensah",
    profilePicture: Avartar3,
    followers: 143000,
  },
  {
    id: 4,
    name: "Nelson Mensah",
    profilePicture: Avartar4,
    followers: 143000,
  },
];

export const feedContent = [
  {
    id: 1,
    user: {
      name: "James Madison",
      role: "Agent - top scout",
      avatar: Avartar2,
    },
    contentType: "image", // Indicates this is an image post
    contentSrc: FootballPlaying, // Image source
    description:
      "Delight to get a young talented football joining wolves FC for 2024/2025 season on-going trials",
    likes: 200000,
    comments: 54,
    shares: 5,
  },
  {
    id: 2,
    user: {
      name: "John Doe",
      role: "Football Coach",
      avatar: Avartar1,
    },
    contentType: "video", // Indicates this is a video post
    contentSrc: "https://www.youtube.com/watch?v=6ZdgEQbn7vo", // Video source
    description: "Amazing skills on display by our youth team!",
    likes: 150000,
    comments: 30,
    shares: 10,
  },
  {
    id: 3,
    user: {
      name: "James Doe",
      role: "Agent - top scout",
      avatar: Avartar3,
    },
    contentType: "image", // Indicates this is an image post
    contentSrc:
      "https://images.pexels.com/photos/15153169/pexels-photo-15153169/free-photo-of-football-players-playing-on-a-football-pitch.jpeg", // Image source
    description:
      "Delight to get a young talented football joining wolves FC for 2024/2025 season on-going trials",
    likes: 200000,
    comments: 54,
    shares: 5,
  },
];

export const networkContent = [
  {
    id: 1,
    user: {
      avatar: Avartar1,
      userType: "Scout",
      name: "Maxwell Lawson",
      location: "Ranger FC, Swansea FC ",
      expertise: "Scout",
    },
  },
  {
    id: 2,
    user: {
      avatar: Avartar2,
      userType: "Athlete",
      name: "Osoola Ashiat",
      location: "Abedeen",
      expertise: "Footballed",
    },
  },
  {
    id: 3,
    user: {
      avatar: Avartar3,
      userType: "Athlete",
      name: "Osoola Ashiat",
      location: "Abedeen",
      expertise: "Basketballer",
    },
  },
  {
    id: 4,
    user: {
      avatar: Manchester,
      userType: "Club/Organization",
      name: "Manchester UTD",
      location: "London",
      expertise: "Club",
    },
  },
  {
    id: 5,
    user: {
      avatar: Barcelona,
      userType: "Club/Organization",
      name: "Barcelona FC",
      location: "Spain",
      expertise: "Club",
    },
  },
  {
    id: 6,
    user: {
      avatar: Avartar4,
      userType: "Athlete",
      name: "Amari Mayama",
      location: "Abedeen",
      expertise: "Relay Sprinter",
    },
  },
];
