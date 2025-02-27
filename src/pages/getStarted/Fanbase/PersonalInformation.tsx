import { SubmitHandler, useForm } from "react-hook-form";
import { InputLabel, Stack, TextField } from "@mui/material";
import useAuthDetails from "pages/auth/useAuthDetails";
import CountrySelect from "components/input/CountrySelect";
import { FanProfilePayload } from "models/profile";
import { useEffect, useState } from "react";

interface IFormInputs {
  country: string;
  city: string;
  phoneNumber: string;
}

interface Props {
  onNext: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: FanProfilePayload | null;
}

const PersonalInformation = (props: Props) => {
  const { onNext, onSubmitFormData, initialValues } = props;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData({ ...data, country: selectedCountry });
    onNext();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      country: initialValues?.country || "",
      city: initialValues?.city || "",
    },
  });

  const { country } = useAuthDetails();

  useEffect(() => {
    if (initialValues) {
      setValue("country", initialValues.country || "");
      setValue("city", initialValues.city || "");
      // setValue("phoneNumber", initialValues.phoneNumber || "");
      setSelectedCountry(country || "Nigeria");
    }
  }, [initialValues, setValue]);

  const [selectedCountry, setSelectedCountry] = useState("");

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
          <Stack direction="row" spacing={3}>
            <div className="w-full">
              <InputLabel>Country</InputLabel>
              <CountrySelect
                handleCountryChange={(data) => setSelectedCountry(data)}
                defaultValues={selectedCountry}
              />
            </div>

            <div className="w-full">
              <TextField
                id="city"
                placeholder="Enter City"
                label="City"
                fullWidth
                error={!!errors.city}
                {...register("city", {
                  required: "Enter your city here",
                })}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
          </Stack>
          <div className="mt-5">
            <TextField
              id="bio"
              label="Telephone Number"
              placeholder="Telephone Number"
              type="number"
              fullWidth
              {...register("phoneNumber", {
                required: "Enter your phone number here",
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
          >
            Next
          </button>
        </form>
      </div>
    </Stack>
  );
};

export default PersonalInformation;
