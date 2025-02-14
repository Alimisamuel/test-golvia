import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Box, Divider, InputLabel, ListItemButton, Stack } from "@mui/material";
import { scoutingRegions, SPORTS } from "assets/data/data";
import useAuthDetails from "pages/auth/useAuthDetails";
import { FanProfilePayload } from "api/types";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: FanProfilePayload | null;
}

interface IFormInputs {
  favouriteSport: string[];
  selectedRegions: string[];
  selectedNotifications: string[];
}

const Engagement = (props: Props) => {
  const { onNext, onPrevious, onSubmitFormData, initialValues } = props;

  const { handleSubmit } = useForm<IFormInputs>();

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  const onSubmit = () => {
    const data = {
      favouriteSport,
      selectedRegions,
      selectedNotifications,
    };
    onSubmitFormData(data); // Pass form data to the parent
    onNext();
  };
  const { sportType } = useAuthDetails();
  useEffect(() => {
    if (sportType) {
      setFavouriteSport(sportType?.split(", "));
    }
  }, [sportType]);

  const [favouriteSport, setFavouriteSport] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      setFavouriteSport(initialValues.favoriteSports);
      setSelectedRegions(initialValues.interactions);
      setSelectedNotifications(initialValues.notificationPreferences);
    }
  }, [initialValues]);

  const handleSelectFavourite = (sport: string) => {
    if (favouriteSport.includes(sport)) {
      // Remove the sport if it's already selected
      setFavouriteSport(favouriteSport.filter((s) => s !== sport));
    } else {
      // Add the sport if it's not already selected
      setFavouriteSport([...favouriteSport, sport]);
    }
  };
  const handleSelectRegions = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };
  const handleSelectNotification = (value: string) => {
    if (selectedNotifications.includes(value)) {
      setSelectedNotifications(selectedNotifications.filter((v) => v !== value));
    } else {
      setSelectedNotifications([...selectedNotifications, value]);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Engagement Preferences</h2>
        <form className="mt-6 md:mt-12">
          <Stack spacing={2}>
            <InputLabel>Select Your Favorite Sports</InputLabel>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {SPORTS?.map((sport, index) => {
                const isSelected = favouriteSport.includes(sport);
                return (
                  <ListItemButton
                    onClick={() => handleSelectFavourite(sport)}
                    key={index}
                    selected={isSelected}
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                      border: "1px solid",
                      borderColor: "gray.border",
                      color: "#6A7280",
                      borderRadius: "6px",
                      "&.Mui-selected": {
                        borderColor: "#88AFEE",
                        color: "#1D69D8",
                      },
                    }}
                  >
                    {sport}
                  </ListItemButton>
                );
              })}
            </Box>
            <Divider sx={{ py: 2 }} />
            <div className="mt-12">
              <InputLabel>Select Regions of Interest for Sports News and Updates</InputLabel>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {scoutingRegions?.map((region, index) => {
                  const isSelected = selectedRegions.includes(region);
                  return (
                    <ListItemButton
                      onClick={() => handleSelectRegions(region)}
                      selected={isSelected}
                      key={index}
                      sx={{
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        border: "1px solid",
                        borderColor: "gray.border",
                        color: "#6A7280",
                        borderRadius: "6px",
                        "&.Mui-selected": {
                          borderColor: "#88AFEE",
                          color: "#1D69D8",
                        },
                      }}
                    >
                      {region}
                    </ListItemButton>
                  );
                })}
              </Box>
            </div>
            <Divider sx={{ py: 2 }} />
            <div className="mt-12">
              <InputLabel>Select Notifications Preferences</InputLabel>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {["Email", "Event Announcements", "SMS", "Push"]?.map((notification, index) => {
                  const isSelected = selectedNotifications.includes(notification);
                  return (
                    <ListItemButton
                      onClick={() => handleSelectNotification(notification)}
                      key={index}
                      selected={isSelected}
                      sx={{
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        border: "1px solid",
                        borderColor: "gray.border",
                        color: "#6A7280",
                        borderRadius: "6px",
                        "&.Mui-selected": {
                          borderColor: "#88AFEE",
                          color: "#1D69D8",
                        },
                      }}
                    >
                      {notification}
                    </ListItemButton>
                  );
                })}
              </Box>
            </div>
          </Stack>
          <Stack direction="row" spacing={2} marginTop={5}>
            <button
              onClick={previousView}
              className="text-primary border border-primary bg-white text-base w-full mt-6 py-3 rounded-lg font-medium"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
            >
              Next
            </button>
          </Stack>
        </form>
      </div>
    </Stack>
  );
};

export default Engagement;
