import { SubmitHandler, useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { ClubProfilePayload } from "models/profile";
import React from "react";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ClubProfilePayload | null;
}

interface IFormInputs {
  clubManager: string;
  clubEmail: string;
  clubWebsite: string;
  socialMedia: string;
  clubName: string;
}

const ContactInformation = (props: Props) => {
  const { onNext, onPrevious, onSubmitFormData, initialValues } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      clubManager: initialValues?.contactPersonName || "",
      clubEmail: initialValues?.contactEmail || "",
      clubWebsite: initialValues?.website || "",
      clubName: initialValues?.clubName || "",
      socialMedia: initialValues?.socialLinks[0] || "",
    },
  });

  React.useEffect(() => {
    if (initialValues) {
      setValue("clubManager", initialValues.contactPersonName || "");
      setValue("clubEmail", initialValues.contactEmail || "");
      setValue("clubWebsite", initialValues.website || "");
      setValue("clubName", initialValues.clubName || "");
      setValue("socialMedia", initialValues.socialLinks[0] || "");
    }
  }, [initialValues, setValue]);

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
        <h2 className="text-[#AAB1C0] text-xl font-medium">Contact Information</h2>
        <form className="mt-6 md:mt-12">
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <div className="w-full">
                <TextField
                  id="yearsofexperience"
                  label="Club Manager/Coach’s Name"
                  error={!!errors.clubManager}
                  helperText={errors.clubManager?.message}
                  placeholder="Enter Club Manager/Coach’s Name"
                  fullWidth
                  {...register("clubManager", {
                    required: "Enter Club Manager",
                  })}
                />
              </div>
              <div className="w-full">
                <TextField
                  label="Club Email"
                  fullWidth
                  placeholder="Enter Affiliate"
                  {...register("clubEmail", {
                    required: "Enter Club Email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  error={!!errors.clubEmail}
                  helperText={errors.clubEmail?.message}
                />
              </div>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <div className="w-full">
                <TextField
                  placeholder="Enter Club Name "
                  label="Club Name "
                  fullWidth
                  error={!!errors.clubName}
                  {...register("clubName", {
                    required: "Enter Club Name",
                  })}
                  helperText={errors.clubName?.message}
                />
              </div>
              <div className="w-full">
                <TextField
                  placeholder="Enter Club’s Website Links"
                  label="Club’s Website "
                  fullWidth
                  error={!!errors.clubWebsite}
                  {...register("clubWebsite", {
                    required: "Enter Club Website",
                    pattern: {
                      value:
                        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/,
                      message: "Enter a valid website URL (e.g., https://example.com)",
                    },
                  })}
                  helperText={errors.clubWebsite?.message}
                />
              </div>
            </Stack>
            <Stack direction="column" width="100%" spacing={2}>
              <div className="w-full">
                <TextField
                  placeholder="Enter  Social Media Links"
                  label="Club’s Social Media Links"
                  fullWidth
                  error={!!errors.socialMedia}
                  {...register("socialMedia", {
                    required: "Enter Club Social Media",
                    pattern: {
                      value:
                        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/,
                      message: "Enter a valid website URL (e.g., https://example.com)",
                    },
                  })}
                  helperText={errors.clubWebsite?.message}
                />
              </div>
            </Stack>
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

export default ContactInformation;
