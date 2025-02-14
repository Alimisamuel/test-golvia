import { SubmitHandler, useForm } from "react-hook-form";
import { ListSubheader, MenuItem, Stack, TextField } from "@mui/material";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { sportsPositions, sportsTeams } from "assets/data/data";
import { AthleteProfilePayload } from "api/types";
import { useEffect } from "react";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: AthleteProfilePayload | null;
}

interface IFormInputs {
  currentclub: string;
  preferredposition: string;
  preferredfoot: string;
  age: string;
  yearsofexperience: number;
  biography: string;
  preferredclub: string;
}

const ClubInformation = (props: Props) => {
  const { onNext, onPrevious, onSubmitFormData, initialValues } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      currentclub: initialValues?.currentClub || "",
      preferredclub: initialValues?.preferredClub || "",
      preferredfoot: initialValues?.preferredFoot || "",
      age: initialValues?.dateOfBirth || "",
      yearsofexperience: initialValues?.yearsOfExperience || 0,
      preferredposition: initialValues?.preferredPosition || "",
    },
  });

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData(data); // Pass form data to the parent
    onNext();
  };

  useEffect(() => {
    if (initialValues) {
      setValue("currentclub", initialValues.currentClub || "");
    }
  }, [initialValues, setValue]);

  const availableClub = sportsTeams;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Club Information</h2>
        <form className="mt-6 md:mt-12">
          <Stack spacing={2}>
            <TextField
              type={"text"}
              id={"currentclub"}
              placeholder={"Enter current club"}
              label={
                <p>
                  Current Club <span>(optional)</span>
                </p>
              }
              fullWidth
              error={!!errors.currentclub}
              {...register("currentclub", {
                required: false,
              })}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <div className="w-full">
                <TextField
                  id="preferred-position"
                  label="Preferred Position"
                  defaultValue={initialValues?.preferredPosition || 1}
                  fullWidth
                  select
                  SelectProps={{ IconComponent: ChevronDownIcon }}
                  {...register("preferredposition", {
                    required: "Kindly select a position",
                  })}
                >
                  <MenuItem value="1" disabled>
                    Select Position
                  </MenuItem>
                  {sportsPositions?.map((position, index) => (
                    <MenuItem
                      key={index}
                      value={`${position?.position}`}
                    >{`${position.position}`}</MenuItem>
                  ))}
                </TextField>
                {errors.preferredposition && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredposition.message}</p>
                )}
              </div>
              <div className="w-full">
                <TextField
                  label="Preferred Foot"
                  fullWidth
                  select
                  defaultValue={initialValues?.preferredFoot || 1}
                  SelectProps={{ IconComponent: ChevronDownIcon }}
                  {...register("preferredfoot", {
                    required: "Kindly select a foot",
                  })}
                >
                  <MenuItem value="1" disabled>
                    Select Foot
                  </MenuItem>
                  <MenuItem value="Right">Right</MenuItem>
                  <MenuItem value="Left">Left</MenuItem>
                </TextField>
                {errors.preferredfoot && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredfoot.message}</p>
                )}
              </div>
            </Stack>

            <Stack direction="row" width="100%" spacing={2}>
              <div className="w-full">
                <TextField
                  type="date"
                  id="age"
                  placeholder="Enter age"
                  label="Date of Birth"
                  fullWidth
                  error={!!errors.age}
                  {...register("age", {
                    required: "Enter your age here",
                  })}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>
              <div className="w-full">
                <TextField
                  type="number"
                  id="yearsofexperience"
                  placeholder="Enter years"
                  label="Years of experience"
                  fullWidth
                  error={!!errors.yearsofexperience}
                  {...register("yearsofexperience", {
                    required: "Enter years here",
                  })}
                />
                {errors.yearsofexperience && (
                  <p className="text-red-500 text-sm mt-1">{errors.yearsofexperience.message}</p>
                )}
              </div>
            </Stack>

            <div>
              <TextField
                id="grouped-select"
                label="Preferred Club"
                select
                defaultValue={initialValues?.preferredClub || 1}
                fullWidth
                error={!!errors.preferredclub}
                {...register("preferredclub", {
                  required: "Kindly select a club",
                })}
              >
                <MenuItem value="1">Select Club</MenuItem>
                {availableClub?.reduce<JSX.Element[]>((countryAcc, teams) => {
                  countryAcc.push(
                    <ListSubheader sx={{ color: "primary.main" }} key={teams.country}>
                      {teams.country}
                    </ListSubheader>
                  );

                  const teamItems = teams.teams.map((tea, index) => (
                    <MenuItem sx={{ fontSize: "12px" }} key={index} value={tea}>
                      {tea}
                    </MenuItem>
                  ));

                  countryAcc.push(...teamItems);
                  return countryAcc;
                }, [] as JSX.Element[])}
              </TextField>

              {errors.preferredclub && (
                <p className="text-red-500 text-sm mt-1">{errors.preferredclub.message}</p>
              )}
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
      {/* <div className="md:w-1/2">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Quick Guide</h2>
        <div className="md:max-w-[360px]">
          <div className="mt-8 h-[320px] rounded-2xl bg-quaternary"></div>
          <div className="flex justify-end mt-8 text-[#42597A] underline font-medium">
            <Link to={"/feed"}>Quit & Continue Later</Link>
          </div>
        </div>
      </div> */}
    </Stack>
  );
};

export default ClubInformation;
