import { SubmitHandler, useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import CountrySelect from "components/input/CountrySelect";
import { useEffect, useState } from "react";
import { ScoutProfilePayload } from "api/types";
import useAuthDetails from "pages/auth/useAuthDetails";

interface IFormInputs {
  country: string;
  city: string;
  phoneNumber: string;
}

interface Props {
  onNext: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ScoutProfilePayload | null;
}

const PersonalInformation = (props: Props) => {
  const { onNext, onSubmitFormData, initialValues } = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData({ ...data, country: selectedCountry });
    onNext();
  };

  const { country: initialCountryOnRegistration } = useAuthDetails();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      country: initialCountryOnRegistration,
      city: initialValues?.city || "",
      phoneNumber: initialValues?.phoneNumber || "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValue("city", initialValues.city || "");
      setSelectedCountry(initialCountryOnRegistration || "Nigeria");
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
              <CountrySelect
                handleCountryChange={(data) => setSelectedCountry(data)}
                defaultValues="Nigeria"
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

            <div>
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
          </Stack>
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
