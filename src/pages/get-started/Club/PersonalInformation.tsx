import { SubmitHandler, useForm } from "react-hook-form";
import {
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Box,
  Typography,
  Avatar,
  LinearProgress,
  Button,
} from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import React, { useEffect } from "react";
import useAuthDetails from "pages/auth/useAuthDetails";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron-down.svg";
import { leagueLevels } from "assets/data/data";
import { uploadImageAndVideo } from "api/cloudinaryApi";
import CountrySelect from "components/input/CountrySelect";
import { ClubProfilePayload } from "api/types";

interface IFormInputs {
  country: string;
  league: string;
  cityoforigin: string;
  phoneNumber: string;
  profileUrl: string;
}

interface Props {
  onNext: () => void;
  onSubmitFormData: (data: IFormInputs) => void;
  initialValues: ClubProfilePayload | null;
}

const PersonalInformation = (props: Props) => {
  const { onNext, onSubmitFormData, initialValues } = props;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onSubmitFormData({ ...data, profileUrl: imageUrl, country: selectedCountry });
    onNext();
  };

  const { country, firstName, lastName, profileType, sportType, profilePicture } = useAuthDetails();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: {
      country: country || "",
      cityoforigin: initialValues?.city || "",
      league: initialValues?.competitionLevel || "",
      phoneNumber: initialValues?.contactPhone,
      profileUrl: initialValues?.teamLogoUrl || "",
    },
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadImageStatus, setImageUploadStatus] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");

  const [, setImage] = React.useState("");

  React.useEffect(() => {
    if (initialValues) {
      setValue("country", initialValues.country || "");
      setValue("cityoforigin", initialValues.city || "");
      setValue("league", initialValues.competitionLevel || "");
      setValue("league", initialValues.competitionLevel || "");
      setValue("phoneNumber", initialValues.contactPhone || "");
      setValue("profileUrl", initialValues.teamLogoUrl || "");
      setSelectedCountry(country || "Nigeria");
      setImageUrl(initialValues?.teamLogoUrl);
    }
  }, [initialValues, setValue]);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: {
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0].size > 2097152) {
        // toast.error(
        //   "Image size is too large. Please upload an image below 2MB."
        // );
      } else {
        setImageFiles(acceptedFiles);
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onloadend = () => {
          const base64 = reader.result;
          setImage(base64 as string);
        };
      }
    },
  });
  React.useEffect(() => {
    if (imageFiles.length > 0) {
      handleImageUpload();
    }
  }, [imageFiles]);

  const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      const response = await uploadImageAndVideo(imageFiles[0], null, (progress) => {
        setUploadProgress(progress);
        setImageUploadStatus(`${progress}% - Completed`);
      });
      setImageUrl(response.imageUrl);
      setIsLoading(false);
      // toast.success("Image uploaded successfully!");
      setUploadProgress(100);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profilePicture != null) {
      setImageUrl(profilePicture.toString());
    } else {
      setImageUrl(""); // or any default value you prefer
    }
  }, [profilePicture]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      marginY={{ xs: 2, md: 4 }}
      spacing={{ xs: 4, md: 7 }}
      paddingX={{ xs: 2, md: 4 }}
    >
      <div className="md:w-full">
        <h2 className="text-[#AAB1C0] text-xl font-medium">Personal Information</h2>
        <form className="mt-6 md:mt-10">
          <Grid container columnSpacing={4} rowSpacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <InputLabel>Country</InputLabel>
                <CountrySelect
                  handleCountryChange={(data) => setSelectedCountry(data)}
                  defaultValues="Nigeria"
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  SelectProps={{
                    IconComponent: ChevronDownIcon,
                    displayEmpty: true,
                  }}
                  select
                  defaultValue={initialValues?.competitionLevel || ""}
                  id="city"
                  placeholder="League/Competition Level"
                  label="League/Competition Level"
                  helperText={errors.league?.message}
                  fullWidth
                  error={!!errors.league}
                  {...register("league", {
                    required: "Please select your league",
                  })}
                >
                  <MenuItem value={""} disabled>
                    Select
                  </MenuItem>
                  {leagueLevels.map((levels, index) => (
                    <MenuItem key={index} value={levels}>
                      {levels}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <TextField
                  id="city"
                  placeholder="Enter City"
                  label="City of Origin"
                  helperText={errors.cityoforigin?.message}
                  fullWidth
                  error={!!errors.cityoforigin}
                  {...register("cityoforigin", {
                    required: "Enter City",
                  })}
                />
              </div>
              <div className="w-full mt-4">
                <TextField
                  placeholder="Telephone Number"
                  label="Telephone Number"
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  error={!!errors.phoneNumber}
                  {...register("phoneNumber", {
                    required: "Enter Phone Number",
                  })}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="w-full">
                <InputLabel>Upload Profile Picture</InputLabel>
                <Box
                  sx={{
                    mt: 1,
                    bgcolor: "primary.light",
                    p: 3,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    columnGap: 3,
                    boxSizing: "border-box",
                  }}
                >
                  <Box sx={{ maxWidth: "50%" }}>
                    {imageFiles.length >= 1 || imageUrl ? (
                      <div>
                        <div className="relative">
                          <Avatar src={imageUrl || ""} sx={{ width: 60, height: 60 }} />
                          <div className="w-4 h-4 bg-nonenary rounded-full absolute top-0 left-10 border-white border-4"></div>
                        </div>
                        {uploadProgress === 100 || imageUrl ? (
                          <div {...getImageRootProps()}>
                            <input {...getImageInputProps()} />
                            <p className="text-sm font-medium text-primary underline cursor-pointer">
                              Re-upload Picture
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-[#dedede] underline cursor-not-allowed">
                            Re-upload Picture
                          </p>
                        )}
                        <p className="text-senary text-xs mb-5">{imageFiles[0]?.name}</p>
                        {imageFiles.length > 1 && (
                          <LinearProgress
                            variant="buffer"
                            value={uploadProgress}
                            valueBuffer={uploadProgress + 10}
                          />
                        )}

                        <p className="text-nonenary text-xs mt-2">{uploadImageStatus}</p>
                      </div>
                    ) : (
                      <Box
                        {...getImageRootProps()}
                        sx={{
                          display: "grid",
                          placeContent: "center",
                          width: "80px",
                          height: "80px",
                          bgcolor: "#fff",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      >
                        <IoAdd style={{ fontSize: "30px" }} />
                        <input {...getImageInputProps()} />
                      </Box>
                    )}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{`${firstName} ${lastName}`}</Typography>
                    <Typography sx={{ color: "text.disabled", fontSize: "12px", mt: 1 }}>
                      Location : <span style={{ color: "#000" }}>{country}</span>
                    </Typography>
                    <Typography
                      sx={{ color: "text.disabled", fontSize: "12px" }}
                    >{`${profileType} - ${sportType}`}</Typography>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 5, py: 2 }}
            className="bg-primary text-white text-base w-full mt-12 py-3 rounded-lg font-medium"
          >
            Next
          </Button>
        </form>
      </div>
    </Stack>
  );
};

export default PersonalInformation;
