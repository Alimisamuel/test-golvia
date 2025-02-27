import { SubmitHandler, useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { AthleteProfilePayload } from "models/profile";
import React from "react";

interface IFormInputs {
  location: string;
  height: number;
  weight: number;
  biography: string;
}

interface Props {
  onNext: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: AthleteProfilePayload | null;
}

const PersonalInformation = (props: Props) => {
  const { onNext, onSubmitFormData, initialValues } = props;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData(data); // Pass form data to the parent
    onNext();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      location: initialValues?.address || "",
      height: parseFloat(initialValues?.height || ""),
      weight: parseFloat(initialValues?.weight || ""),
      biography: initialValues?.biography || "",
    },
  });

  React.useEffect(() => {
    if (initialValues) {
      setValue("location", initialValues.address || "");
      setValue("biography", initialValues.biography || "");
      setValue("height", parseFloat(initialValues?.height || ""));
      setValue("weight", parseFloat(initialValues?.weight || ""));
    }
  }, [initialValues, setValue]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Personal Information</h2>
        <form className="mt-6 md:mt-12">
          <Stack spacing={2}>
            <div>
              <TextField
                type="text"
                id="location"
                placeholder="Enter Location"
                label="Location"
                fullWidth
                error={!!errors.location}
                {...register("location", {
                  required: "Enter your location here",
                })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
            <Stack direction="row" spacing={3} width="100%">
              <div className="w-full">
                <TextField
                  type="number"
                  id="height"
                  placeholder="Height(ft)"
                  label="Height"
                  fullWidth
                  error={!!errors.height}
                  {...register("height", {
                    required: "Enter your height here",
                  })}
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
                )}
              </div>
              <div className="w-full">
                <TextField
                  type="number"
                  id="weight"
                  placeholder="Weight(lbs)"
                  label="Weight"
                  fullWidth
                  error={!!errors.weight}
                  {...register("weight", {
                    required: "Enter your weight here",
                  })}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                )}
              </div>
            </Stack>
            <div>
              <TextField
                id="bio"
                label="Biography"
                placeholder="Enter biography"
                multiline
                fullWidth
                {...register("biography", {
                  required: "Enter your biography here",
                })}
              />
              {errors.biography && (
                <p className="text-red-500 text-sm mt-1">{errors.biography.message}</p>
              )}
            </div>
          </Stack>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
          >
            Next
          </button>
        </form>
      </div>
      {/* <div className="md:w-1/2">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Quick Guide</h2>
        <div className="md:max-w-[360px]">
          <div className="mt-8 h-[320px] rounded-2xl bg-quaternary"></div>
          <div className="flex justify-end mt-4 md:mt-8 text-[#42597A] underline font-medium">
            <Link to={"/feed"}>Quit & Continue Later</Link>
          </div>
        </div>
      </div> */}
    </Stack>
  );
};

export default PersonalInformation;
