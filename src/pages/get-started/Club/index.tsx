import PersonalInformation from "./PersonalInformation";
import { SectionKeys } from "../useSectionHook";
import { useEffect, useState } from "react";
import ContactInformation from "./ContactInformattion";
import TeamInformation from "./TeamInformation";
import RecruitmentProcess from "./RecruitmentProcess";
import { ClubProfilePayload } from "api/types";
import useAuthDetails from "pages/auth/useAuthDetails";

interface Props {
  currentSectionKey: SectionKeys<"TEAM">;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isProfileEdit: boolean;
}

const Club = (props: Props) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = props;

  const [personalInfo, setPersonalInfo] = useState(null);
  const [professionalIfo, setProfessionalInfo] = useState(null);
  const [reference, setreference] = useState(null);

  const [initialValues, setInitialValues] = useState<ClubProfilePayload | null>();

  const { profileDetails } = useAuthDetails();

  useEffect(() => {
    if (props.isProfileEdit) {
      setInitialValues(profileDetails);
    } else {
      setInitialValues(null);
    }
  }, [props.isProfileEdit, profileDetails]);

  const handlePersonalData = (data: any) => {
    setPersonalInfo(data);
  };
  const handleClubData = (data: any) => {
    setProfessionalInfo(data);
  };
  const handlePreferenceData = (data: any) => {
    setreference(data);
  };

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
      {currentSectionKey == "contactInfo" && (
        <ContactInformation
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmitFormData={handleClubData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 3 */}
      {currentSectionKey == "teamInfo" && (
        <TeamInformation
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmitFormData={handlePreferenceData}
          initialValues={initialValues ?? null}
        />
      )}
      {/* Form 3 */}
      {currentSectionKey == "preference" && (
        <RecruitmentProcess
          onComplete={onComplete}
          onPrevious={onPrevious}
          personalInfo={personalInfo}
          professionalIfo={professionalIfo}
          reference={reference}
          initialValues={initialValues ?? null}
          isProfileEdit={props.isProfileEdit}
        />
      )}
    </>
  );
};

export default Club;
