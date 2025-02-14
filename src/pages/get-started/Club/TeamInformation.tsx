import {
  Grid,
  Stack,
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import { IoIosAddCircleOutline } from "react-icons/io";

import React, { useState, ChangeEvent } from "react";
import Icons from "constants/Icons";
import { ClubProfilePayload } from "api/types";

interface IFormInputs {
  playerInfo: PlayerInfo[];
  achievements: AchievementsInfo[];
  vacancies: VacancyInfo[];
}

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ClubProfilePayload | null;
}

const TeamInformation = (props: Props) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo[]>([
    { playerName: "", playerPosition: "" },
    { playerName: "", playerPosition: "" },
  ]);
  const [achievements, setAchievements] = useState<AchievementsInfo[]>([{ achievement: "" }]);
  const [vacancies, setVacancies] = useState<VacancyInfo[]>([{ vacancy: "" }]);

  const { onNext, onPrevious, onSubmitFormData, initialValues } = props;

  const onSubmit = () => {
    const formData = {
      playerInfo,
      achievements,
      vacancies,
    };
    console.log("Submitting Form Data:", formData);
    onSubmitFormData(formData);
    onNext();
  };

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  React.useEffect(() => {
    if (initialValues) {
      setAchievements(initialValues.clubAchievements.map((item) => ({ achievement: item })) || []);
      setVacancies(initialValues.clubVacancies.map((item) => ({ vacancy: item })) || []);
      setPlayerInfo(
        initialValues?.players || [
          { playerName: "", playerPosition: "" },
          { playerName: "", playerPosition: "" },
        ]
      );
      // setValue("phoneNumber", initialValues.phoneNumber || "");
    }
  }, [initialValues]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Team Information</h2>
        <form className="mt-6 md:mt-5">
          <Players playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
          <Divider sx={{ my: 4 }} />
          <RecentAchievement achievements={achievements} setAchievements={setAchievements} />
          <Divider sx={{ my: 4 }} />
          <AvaialableVacancy vacancies={vacancies} setVacancies={setVacancies} />
          <Divider sx={{ my: 4 }} />

          <Stack direction="row" spacing={2} marginTop={5}>
            <button
              onClick={previousView}
              className="text-primary border border-primary bg-white text-base w-full mt-6 py-3 rounded-lg font-medium"
            >
              Previous
            </button>
            <Button
              variant="contained"
              onClick={onSubmit}
              className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
            >
              Next
            </Button>
          </Stack>
        </form>
      </div>
    </Stack>
  );
};

export default TeamInformation;

interface PlayerInfo {
  playerName: string;
  playerPosition: string;
}

const Players = ({
  playerInfo,
  setPlayerInfo,
}: {
  playerInfo: PlayerInfo[];
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo[]>>;
}) => {
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const values = [...playerInfo];
    values[index][name as keyof PlayerInfo] = value;
    setPlayerInfo(values);
  };

  const handleAddPlayer = () => {
    setPlayerInfo([...playerInfo, { playerName: "", playerPosition: "" }]);
  };

  const handleDeletePlayer = (index: number) => {
    const values = [...playerInfo];
    values.splice(index, 1);
    setPlayerInfo(values);
  };
  const isAddButtonDisabled = () => {
    if (playerInfo.length > 0) {
      const lastplayer = playerInfo[playerInfo.length - 1];
      return !lastplayer.playerName || !lastplayer.playerPosition;
    }
  };
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Players</Typography>
      <Grid container spacing={3}>
        {playerInfo?.map((player, index) => (
          <div key={index}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  id="city"
                  name="playerName"
                  label="Player name"
                  placeholder="Player name"
                  fullWidth
                  value={player?.playerName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full flex items-end">
                <TextField
                  id="city"
                  label="Player Position"
                  name="playerPosition"
                  placeholder="Enter Position"
                  fullWidth
                  value={player?.playerPosition}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <IconButton
                  onClick={() => handleDeletePlayer(index)}
                  sx={{ visibility: index === 0 ? "hidden" : "visible" }}
                >
                  <img src={Icons.trash} />
                </IconButton>
              </div>
            </Grid>
          </div>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={isAddButtonDisabled()}
            onClick={handleAddPlayer}
            startIcon={<IoIosAddCircleOutline />}
            sx={{
              py: 1,
              borderRadius: "8px",
              border: "1px solid",
              borderColor: "primary.main",
              width: "149px",
            }}
          >
            Add Player
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

interface AchievementsInfo {
  achievement: string;
}
const RecentAchievement = ({
  achievements,
  setAchievements,
}: {
  achievements: AchievementsInfo[];
  setAchievements: React.Dispatch<React.SetStateAction<AchievementsInfo[]>>;
}) => {
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const values = [...achievements];
    values[index][name as keyof AchievementsInfo] = value;
    setAchievements(values);
  };

  const handleAddAchievement = () => {
    setAchievements([...achievements, { achievement: "" }]);
  };

  const handleDeleteAchievement = (index: number) => {
    const values = [...achievements];
    values.splice(index, 1);
    setAchievements(values);
  };
  const isAddButtonDisabled = () => {
    if (achievements.length > 0) {
      const lastachievement = achievements[achievements.length - 1];
      return !lastachievement.achievement;
    }
  };
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Recent Achievements</Typography>
      <Grid container spacing={3}>
        {achievements?.map((achievement, index) => (
          <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
            <div className="w-full flex items-end">
              <TextField
                id="city"
                name="achievement"
                label="Trophies, notable matches"
                placeholder="Enter trophies, notable matches"
                fullWidth
                value={achievement?.achievement}
                onChange={(event) => handleInputChange(index, event)}
              />
              <IconButton
                onClick={() => handleDeleteAchievement(index)}
                sx={{ visibility: index === 0 ? "hidden" : "visible" }}
              >
                <img src={Icons.trash} />
              </IconButton>
            </div>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={isAddButtonDisabled()}
            onClick={handleAddAchievement}
            startIcon={<IoIosAddCircleOutline />}
            sx={{
              py: 1,
              borderRadius: "8px",
              border: "1px solid",
              borderColor: "primary.main",
              width: "209px",
            }}
          >
            Add Achievements
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

interface VacancyInfo {
  vacancy: string;
}
const AvaialableVacancy = ({
  vacancies,
  setVacancies,
}: {
  vacancies: VacancyInfo[];
  setVacancies: React.Dispatch<React.SetStateAction<VacancyInfo[]>>;
}) => {
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const values = [...vacancies];
    values[index][name as keyof VacancyInfo] = value;
    setVacancies(values);
  };

  const handleAddPlayer = () => {
    setVacancies([...vacancies, { vacancy: "" }]);
  };

  const handleDeleteGuest = (index: number) => {
    const values = [...vacancies];
    values.splice(index, 1);
    setVacancies(values);
  };
  const isAddButtonDisabled = () => {
    if (vacancies.length > 0) {
      const lastachievement = vacancies[vacancies.length - 1];
      return !lastachievement.vacancy;
    }
  };
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Available Vacancies for New Players</Typography>
      <Grid container spacing={3}>
        {vacancies?.map((vacancy, index) => (
          <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
            <div className="w-full flex items-end">
              <TextField
                id="city"
                name="vacancy"
                label="Vacancy Position"
                placeholder="Enter vacancy position"
                fullWidth
                value={vacancy?.vacancy}
                onChange={(event) => handleInputChange(index, event)}
              />
              <IconButton
                onClick={() => handleDeleteGuest(index)}
                sx={{ visibility: index === 0 ? "hidden" : "visible" }}
              >
                <img src={Icons.trash} />
              </IconButton>
            </div>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            disabled={isAddButtonDisabled()}
            onClick={handleAddPlayer}
            startIcon={<IoIosAddCircleOutline />}
            sx={{
              py: 1,
              borderRadius: "8px",
              border: "1px solid",
              borderColor: "primary.main",
              width: "209px",
            }}
          >
            Add Position
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
