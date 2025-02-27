import PersonalInformation from "./PersonalInformation";
import ClubInformation from "./ClubInformation";
import MediaUpload from "./MediaUpload";
import { SectionKeys } from "../useSectionHook";
import React, { useEffect, useState } from "react";
import { AthleteProfilePayload } from "models/profile";
import useAuthDetails from "pages/auth/useAuthDetails";

interface Props {
  currentSectionKey: SectionKeys<"ATHLETES">;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isProfileEdit: boolean;
}

const Athletes = (props: Props) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = props;
  const [personalInfo, setPersonalInfo] = useState(null);
  const [clubInfo, setClublInfo] = useState(null);
  const [initialValues, setInitialValues] = useState<AthleteProfilePayload | null>();

  const handlePersonalData = (data: any) => {
    setPersonalInfo(data);
  };
  const handleClubData = (data: any) => {
    setClublInfo(data);
  };

  const { profileDetails } = useAuthDetails();

  useEffect(() => {
    if (props.isProfileEdit) {
      setInitialValues(profileDetails);
    } else {
      setInitialValues(null);
    }
  }, [props.isProfileEdit, profileDetails]);

  return (
    <>
      {/* Form 1 */}
      {currentSectionKey == "personalInfo" && (
        <PersonalInformation
          onNext={onNext}
          onSubmitFormData={handlePersonalData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 2 */}
      {currentSectionKey == "professionalInfo" && (
        <ClubInformation
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmitFormData={handleClubData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 3 */}
      {currentSectionKey == "mediaUpload" && (
        <MediaUpload
          onComplete={onComplete}
          onPrevious={onPrevious}
          clubInformation={clubInfo}
          personalInformation={personalInfo}
          initialValues={initialValues ?? null}
          isProfileEdit={props.isProfileEdit}
        />
      )}
    </>
  );
};

export default Athletes;
