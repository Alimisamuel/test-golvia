import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { MenuItem, Stack, TextField, Typography, Grid } from "@mui/material";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { ageGroups, scoutingRegions, SPORTS, sportsPositions } from "assets/data/data";
import { ScoutProfilePayload } from "api/types";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ScoutProfilePayload | null;
}

interface IFormInputs {
  athletesscouted: string;
  agegroup: string;
  notes: string;
  scoutinghistory: string;
  regionofinterest: string[];
  sports: string[];
  position: string;
}

const ReferenceInfo = (props: Props) => {
  const { onNext, onPrevious, onSubmitFormData } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData(data); // Pass form data to the parent
    onNext();
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Preferences & Activity Tracking</h2>
        <form className="mt-6 md:mt-12">
          <Grid spacing={2} container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <Typography sx={{ mb: 3, fontWeight: 500 }}>
                  Preferred Athlete Attributes
                </Typography>
                <Controller
                  name="sports"
                  control={control}
                  rules={{ required: "Select an area of specialization" }}
                  defaultValue={[]} // Ensure it's an empty array by default
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Sports"
                      SelectProps={{
                        IconComponent: ChevronDownIcon,
                        multiple: true,
                        displayEmpty: true,
                      }}
                      select
                      error={!!errors.sports}
                      helperText={errors.sports?.message}
                      placeholder="Select Years"
                      fullWidth
                      {...register("sports", {
                        required: "Kindly select a sport",
                      })}
                    >
                      <MenuItem value={""}>Select Sports</MenuItem>
                      {SPORTS?.map((sport, index) => (
                        <MenuItem value={sport} key={index}>
                          {sport}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <Typography sx={{ mb: 3, fontWeight: 500 }}>Activity Tracking</Typography>
                <TextField
                  label="Athletes Scouted (optional)"
                  fullWidth
                  placeholder="Athelete name"
                  {...register("athletesscouted")}
                />

                {errors.athletesscouted && (
                  <p className="text-red-500 text-sm mt-1">{errors.athletesscouted.message}</p>
                )}
              </div>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  SelectProps={{
                    IconComponent: ChevronDownIcon,
                    displayEmpty: true,
                  }}
                  id="age"
                  placeholder="Select"
                  defaultValue={""}
                  label="Age Group"
                  fullWidth
                  select
                  helperText={errors.agegroup?.message}
                  error={!!errors.agegroup}
                  {...register("agegroup", {
                    required: "Select your age group",
                  })}
                >
                  <MenuItem>Select Age group</MenuItem>
                  {ageGroups?.map((age, index) => (
                    <MenuItem key={index} value={age.value}>
                      {age.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  SelectProps={{
                    IconComponent: ChevronDownIcon,
                    displayEmpty: true,
                  }}
                  placeholder="Select"
                  defaultValue={[]}
                  label="Position"
                  fullWidth
                  select
                  sx={{ mt: 2 }}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                  {...register("position", {
                    required: "Select position",
                  })}
                >
                  <MenuItem value={""}>Select Position</MenuItem>
                  {sportsPositions?.map((position, index) => (
                    <MenuItem key={index} value={position.position}>
                      {position.position}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  type="number"
                  id="notes"
                  placeholder="Enter note"
                  multiline
                  rows={4}
                  label="Notes on Specific Athletes (optional)"
                  fullWidth
                  helperText={errors.notes?.message}
                  error={!!errors.notes}
                  {...register("notes", {
                    required: "Enter notes",
                  })}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <Controller
                  name="regionofinterest"
                  control={control}
                  rules={{ required: "Select an scout region" }}
                  defaultValue={[]} // Ensure it's an empty array by default
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      SelectProps={{
                        IconComponent: ChevronDownIcon,
                        multiple: true,
                        displayEmpty: true,
                      }}
                      id="scoutingregion"
                      placeholder="Regions of Interest for Scouting"
                      label="Regions of Interest for Scouting"
                      fullWidth
                      error={!!errors.regionofinterest}
                      {...register("regionofinterest", {
                        required: "Enter years here",
                      })}
                      helperText={errors.regionofinterest?.message}
                    >
                      <MenuItem value={""} disabled>
                        Select Region
                      </MenuItem>
                      {scoutingRegions?.map((options, index) => (
                        <MenuItem key={index} value={options}>
                          {options}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  id="grouped-select"
                  label="Scouting History/Interactions (optional)"
                  placeholder="Enter Scouting History"
                  fullWidth
                  helperText={errors.scoutinghistory?.message}
                  {...register("scoutinghistory")}
                />
              </div>
            </Grid>
          </Grid>
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

export default ReferenceInfo;
