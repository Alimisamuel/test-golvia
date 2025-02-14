import { Typography } from "@mui/material";
import React from "react";

interface Player {
  name: string;
  position: string;
  playerName: string;
  playerPosition: string;
}

const ProfileDisplay: React.FC<{ profileDetails: any }> = ({ profileDetails }) => {
  const {
    address,
    currentClub,
    preferredPosition,
    dateOfBirth,
    height,
    weight,
    biography,
    profession,
    preferredClub,
    preferredFoot,
    yearsOfExperience,
    scoutingExperienceYears,
    notableTalents,
    areasOfSpecialization,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,
    notesOnAthletes,
    position,
    ageGroup,
    scoutingHistory,
    phoneNumber,
    socialMediaLinks,
    city,
    favoriteSports,
    favoriteAthletes,
    notificationPreferences,
    interactions,
    purchasedItems,
    competitionLevel,
    clubName,
    contactEmail,
    contactPersonName,
    contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
  } = profileDetails || {};

  const formatLabel = (key: string) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  const formatArray = (arr: string[] | Player[] | undefined): string => {
    if (!arr || arr.length === 0) return "N/A";
    if (arr[0] instanceof Object) {
      return (arr as Player[])
        .map((player) => `${player.playerName} (${player.playerPosition})`)
        .join(", ");
    }
    return (arr as string[]).join(", ");
  };

  const renderProfile = (obj: any) => {
    return Object.entries(obj)
      .map(([key, value]) => {
        // Check if value is non-null and valid for rendering
        if (value !== null && value !== undefined) {
          // Type guard: Check if it's a valid ReactNode
          let displayValue: React.ReactNode;

          if (Array.isArray(value)) {
            displayValue = formatArray(value);
          } else if (value === "") {
            displayValue = "N/A";
          } else if (typeof value === "string" || typeof value === "number") {
            displayValue = value;
          } else if (typeof value === "object") {
            displayValue = "Object content";
          } else {
            displayValue = "Unknown";
          }

          return (
            <p
              className=" flex md:flex-row flex-col md:space-x-3 mt-3 max-w-full break-words whitespace-pre-wrap"
              key={key}
            >
              <Typography variant="p$14" sx={{ color: "#828282", width: { md: "30%", xs: "90%" } }}>
                {formatLabel(key)}:
              </Typography>
              <Typography
                variant="p$14"
                component="span"
                fontWeight="medium"
                className="text-[#383A43]"
              >
                {displayValue}
              </Typography>
            </p>
          );
        }

        return null; // Return nothing if the value is null or undefined
      })
      .filter(Boolean); // Filter out any null values from the list
  };

  // Combine all profile details into one object for rendering
  const profileData = {
    address,
    currentClub,
    preferredPosition,
    dateOfBirth,
    height,
    weight,
    biography,
    profession,
    preferredClub,
    preferredFoot,
    yearsOfExperience,
    scoutingExperienceYears,
    notableTalents,
    areasOfSpecialization,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,
    notesOnAthletes,
    position,
    ageGroup,
    scoutingHistory,
    phoneNumber,
    socialMediaLinks,
    city,
    favoriteSports,
    favoriteAthletes,
    notificationPreferences,
    interactions,
    purchasedItems,
    competitionLevel,
    clubName,
    contactEmail,
    contactPersonName,
    contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
  };

  return <div>{renderProfile(profileData)}</div>;
};

export default ProfileDisplay;
