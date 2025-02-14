import PersonalInformation from "./PersonalInformation";

import MediaUpload from "./MediaUpload";
import { SectionKeys } from "../useSectionHook";
import React, { useState } from "react";
import ProfessionalInformation from "./ProfessionalInformation";
import ReferenceInfo from "./ReferenceInfo";
import { ScoutProfilePayload } from "api/types";
import useAuthDetails from "pages/auth/useAuthDetails";

interface Props {
  currentSectionKey: SectionKeys<"SCOUT">;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isProfileEdit: boolean;
}
const Scout = (props: Props) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = props;

  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalIfo, setProfessionalInfo] = useState(null);
  const [reference, setreference] = useState(null);

  const [initialValues, setInitialValues] = useState<ScoutProfilePayload | null>();

  const handlePersonalData = (data: any) => {
    setPersonalInfo(data);
  };
  const handleClubData = (data: any) => {
    setProfessionalInfo(data);
  };
  const handlePreferenceData = (data: any) => {
    setreference(data);
  };

  const { profileDetails } = useAuthDetails();

  React.useEffect(() => {
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
        <ProfessionalInformation
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmitFormData={handleClubData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 3 */}
      {currentSectionKey == "preference" && (
        <ReferenceInfo
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmitFormData={handlePreferenceData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 3 */}
      {currentSectionKey == "mediaUpload" && (
        <MediaUpload
          onComplete={onComplete}
          onPrevious={onPrevious}
          professionalInfo={professionalIfo}
          personalInformation={personalInfo}
          reference={reference}
          initialValues={initialValues ?? null}
        />
      )}
    </>
  );
};

export default Scout;
