import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { MenuItem, Stack, TextField, InputAdornment } from "@mui/material";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { scoutingRegions, scoutSpecializations } from "assets/data/data";
import Icons from "constants/Icons";
import { ScoutProfilePayload } from "models/profile";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ScoutProfilePayload | null;
}

interface IFormInputs {
  affiliatedclubs: string;
  scoutingregion: string[];
  areaofspecialization: string[];
  yearsofexperience: number;
  certification: string;
}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const ProfessionalInformation = (props: Props) => {
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

  // const [personName, setPersonName] = useState<string[]>([]);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Professional Information</h2>
        <form className="mt-6 md:mt-12">
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <div className="w-full">
                <TextField
                  id="yearsofexperience"
                  label="Years of Scouting Experience"
                  type="number"
                  placeholder="Enter Years"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Icons.calender} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  {...register("yearsofexperience", {
                    required: "Kindly input a year",
                  })}
                />
                {errors.yearsofexperience && (
                  <p className="text-red-500 text-sm mt-1">{errors.yearsofexperience.message}</p>
                )}
              </div>
              <div className="w-full">
                <TextField
                  id="affiliatedclubs"
                  label="Affiliated Organizations/Clubs (optional)"
                  fullWidth
                  placeholder="Enter Affiliate"
                  {...register("affiliatedclubs")}
                />
              </div>
            </Stack>

            <Stack direction="column" width="100%" spacing={2}>
              <div className="w-full">
                <Controller
                  name="areaofspecialization"
                  control={control}
                  rules={{ required: "Select an area of specialization" }}
                  defaultValue={[]} // Ensure it's an empty array by default
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="demo-multiple-checkbox"
                      select
                      defaultValue={1}
                      SelectProps={{
                        IconComponent: ChevronDownIcon,
                        multiple: true,
                      }}
                      placeholder="Select"
                      label="Area of specialization"
                      fullWidth
                      error={!!errors.areaofspecialization}
                      helperText={errors.areaofspecialization?.message}
                    >
                      <MenuItem value={""} disabled>
                        Select
                      </MenuItem>
                      {scoutSpecializations.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {/* 
                  <Select
                  fullWidth
   
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          displayEmpty
        >
                       <MenuItem value={""} disabled>
                        Select
                      </MenuItem>
          {scoutSpecializations.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select> */}
              </div>

              <div className="w-full">
                <Controller
                  name="scoutingregion"
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
                      }}
                      id="scoutingregion"
                      placeholder="Select Region"
                      label="Scouting Region (geographical focus)"
                      fullWidth
                      error={!!errors.scoutingregion}
                      {...register("scoutingregion", {
                        required: "Enter years here",
                      })}
                      helperText={errors.scoutingregion?.message}
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
            </Stack>

            <div>
              <TextField
                id="certification"
                label="Certification/Accreditation (licenses, qualifications) (optional)"
                placeholder="Enter Certification"
                fullWidth
                {...register("certification")}
              />
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

export default ProfessionalInformation;
