import { SubmitHandler, useForm } from "react-hook-form";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { playerTypesByPosition, sportsRecruitmentAreas } from "assets/data/data";
import { editClubProfile, upgradeClubProfile } from "api/profile";
import { useEffect, useState } from "react";
import useAlert from "components/alert/useAlert";
import { useNavigate } from "react-router-dom";
import BackdropLoader from "components/loaders/Backdrop";
import { ClubProfilePayload } from "models/profile";

interface IFormInputs {
  areas: string;
  playertype: string;
}
interface Achievement {
  achievement: string;
}
interface VacancyInfo {
  vacancy: string;
}

interface Props {
  onPrevious: () => void;
  professionalIfo: any | null; // Adjust type based on your data structure
  personalInfo: any | null;
  reference: any | null;
  onComplete: () => void;
  initialValues: ClubProfilePayload | null;
  isProfileEdit: boolean;
}

const RecruitmentProcess = (props: Props) => {
  const onSubmit: SubmitHandler<IFormInputs> = () => {};
  const { onPrevious, personalInfo, professionalIfo, reference, initialValues, isProfileEdit } =
    props;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      areas: initialValues?.recruitmentAreas || "",
      playertype: initialValues?.playerType || "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValue("areas", initialValues?.recruitmentAreas || "");
      setValue("playertype", initialValues?.playerType || "");
    }
  }, [initialValues, setValue]);

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  const [isLoading, setIsLoading] = useState(false);

  const { cityoforigin, country, league, phoneNumber, profileUrl } = personalInfo || {};
  const { clubEmail, clubManager, clubWebsite, socialMedia, clubName } = professionalIfo || {};
  const { achievements, playerInfo, vacancies } = reference || {};

  const handleAlert = useAlert();

  const navigate = useNavigate();

  const handleUpgradeScout = async () => {
    setIsLoading(true);
    handleSubmit(onSubmit);
    const playerType = getValues("playertype");
    const recruitmentArea = getValues("areas");
    const formattedAchievements = achievements?.map((item: Achievement) => item?.achievement);
    const formattedVacancies = vacancies?.map((item: VacancyInfo) => item?.vacancy);
    await upgradeClubProfile(
      clubName,
      country,
      cityoforigin,
      league,
      clubEmail,
      clubManager,
      phoneNumber,
      clubWebsite,
      [socialMedia],
      recruitmentArea,
      playerType,
      profileUrl,
      playerInfo,
      formattedAchievements,
      formattedVacancies,
      profileUrl
    )
      .then((res) => {
        console.log(res);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleEditScout = async () => {
    setIsLoading(true);
    handleSubmit(onSubmit);
    const playerType = getValues("playertype");
    const recruitmentArea = getValues("areas");
    const formattedAchievements = achievements?.map((item: Achievement) => item?.achievement);
    const formattedVacancies = vacancies?.map((item: VacancyInfo) => item?.vacancy);
    await editClubProfile(
      initialValues?.id || 0,
      clubName,
      country,
      cityoforigin,
      league,
      clubEmail,
      clubManager,
      phoneNumber,
      clubWebsite,
      [socialMedia],
      recruitmentArea,
      playerType,
      profileUrl,
      playerInfo,
      formattedAchievements,
      formattedVacancies,
      profileUrl
    )
      .then((res) => {
        console.log(res);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <BackdropLoader />}
      <Stack
        direction={{ xs: "column", md: "row" }}
        marginY={{ xs: 2, md: 4 }}
        spacing={{ xs: 4, md: 7 }}
        paddingX={{ xs: 2, md: 4 }}
      >
        <div className="md:w-1/2">
          <h2 className="text-[#AAB1C0] text-xl font-medium">Recruitment Preferences</h2>
          <form className="mt-6 md:mt-12">
            <Stack spacing={2}>
              <div className="w-full">
                <TextField
                  SelectProps={{
                    IconComponent: ChevronDownIcon,
                    displayEmpty: true,
                  }}
                  defaultValue={initialValues?.recruitmentAreas || ""}
                  select
                  label="Recruitment Areas"
                  fullWidth
                  error={!!errors.areas}
                  helperText={errors.areas?.message}
                  {...register("areas", {
                    required: "Select recruitment areas",
                  })}
                >
                  <MenuItem value={""} disabled>
                    Select
                  </MenuItem>
                  {sportsRecruitmentAreas?.map((area, index) => (
                    <MenuItem key={index} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div>
                <TextField
                  SelectProps={{
                    IconComponent: ChevronDownIcon,
                    displayEmpty: true,
                  }}
                  defaultValue={initialValues?.playerType || ""}
                  select
                  label="Player Type"
                  fullWidth
                  error={!!errors.playertype}
                  helperText={errors.playertype?.message}
                  {...register("playertype", {
                    required: "Select player type",
                  })}
                >
                  <MenuItem value={""} disabled>
                    Select
                  </MenuItem>
                  {playerTypesByPosition?.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Stack>
            <Stack direction="row" spacing={2} marginTop={5}>
              <Button
                variant="outlined"
                onClick={previousView}
                className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
              >
                Previous
              </Button>

              <Button
                variant="contained"
                sx={{ py: 2 }}
                onClick={isProfileEdit ? handleEditScout : handleUpgradeScout}
                className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
              >
                Next
              </Button>
            </Stack>
          </form>
        </div>
      </Stack>
    </>
  );
};

export default RecruitmentProcess;
