import { SectionKeys } from "../useSectionHook";
import { useEffect, useState } from "react";
import PersonalInformation from "./PersonalInformation";
import Engagement from "./Engagement";
import MediaUpload from "./MediaUpload";
import useAuthDetails from "pages/auth/useAuthDetails";
import { FanProfilePayload } from "models/profile";

interface Props {
  currentSectionKey: SectionKeys<"FANBASE">;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isProfileEdit: boolean;
}

const Fanbase = (props: Props) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = props;

  const [initialValues, setInitialValues] = useState<FanProfilePayload | null>();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalIfo, setProfessionalInfo] = useState(null);

  const handlePersonalData = (data: any) => {
    setPersonalInfo(data);
  };
  const handleClubData = (data: any) => {
    setProfessionalInfo(data);
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
      {currentSectionKey == "engagement" && (
        <Engagement
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
          professionalInfo={professionalIfo}
          personalInformation={personalInfo}
        />
      )}
    </>
  );
};

export default Fanbase;
