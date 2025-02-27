import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const athleteSectionKeys = ["personalInfo", "professionalInfo", "mediaUpload"] as const;
const scoutSectionKeys = ["personalInfo", "professionalInfo", "preference", "mediaUpload"] as const;
const clubSectionKeys = ["personalInfo", "contactInfo", "teamInfo", "preference"] as const;
const fanSectionKeys = ["personalInfo", "engagement", "mediaUpload"] as const;

interface SetupSection {
  label: string;
  completed: boolean;
}

type AthleteSectionKeys = (typeof athleteSectionKeys)[number];
type ScoutSectionKeys = (typeof scoutSectionKeys)[number];
type ClubSectionKeys = (typeof clubSectionKeys)[number];
type FanSectionKeys = (typeof fanSectionKeys)[number];

interface ProfileSectionKeysMap {
  ATHLETES: AthleteSectionKeys;
  SCOUT: ScoutSectionKeys;
  TEAM: ClubSectionKeys;
  FANBASE: FanSectionKeys;
}

export type SectionKeys<T extends keyof ProfileSectionKeysMap> = ProfileSectionKeysMap[T];
type SetupSections<T extends keyof ProfileSectionKeysMap> = {
  [key in SectionKeys<T>]: SetupSection;
};

const athleteSections: SetupSections<"ATHLETES"> = {
  [athleteSectionKeys[0]]: {
    label: "Personal Information",
    completed: false,
  },
  [athleteSectionKeys[1]]: {
    label: "Professional Information",
    completed: false,
  },
  [athleteSectionKeys[2]]: {
    label: "Portfolio Setup",
    completed: false,
  },
};

const scoutSections: SetupSections<"SCOUT"> = {
  [scoutSectionKeys[0]]: {
    label: "Personal Information",
    completed: false,
  },
  [scoutSectionKeys[1]]: {
    label: "Professional Information",
    completed: false,
  },
  [scoutSectionKeys[2]]: {
    label: "Preference",
    completed: false,
  },
  [scoutSectionKeys[3]]: {
    label: "Portfolio Setup",
    completed: false,
  },
};

const clubSections: SetupSections<"TEAM"> = {
  [clubSectionKeys[0]]: {
    label: "Personal Information",
    completed: false,
  },
  [clubSectionKeys[1]]: {
    label: "Contact Information",
    completed: false,
  },
  [clubSectionKeys[2]]: {
    label: "Team Information",
    completed: false,
  },
  [clubSectionKeys[3]]: {
    label: "Recruitment Preferences",
    completed: false,
  },
};

const fanSections: SetupSections<"FANBASE"> = {
  [fanSectionKeys[0]]: {
    label: "Personal Information",
    completed: false,
  },
  [fanSectionKeys[1]]: {
    label: "Engagement Preferences",
    completed: false,
  },
  [fanSectionKeys[2]]: {
    label: "Profile Picture",
    completed: false,
  },
};

export default function useSectionHook<T extends keyof ProfileSectionKeysMap>(profileType: T) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // Select the correct sections based on the profile type
  const setupSections: SetupSections<T> =
    profileType === "ATHLETES"
      ? (athleteSections as SetupSections<T>)
      : profileType === "SCOUT"
        ? (scoutSections as SetupSections<T>)
        : profileType === "TEAM"
          ? (clubSections as SetupSections<T>)
          : (fanSections as SetupSections<T>);

  const sectionKeys = Object.keys(setupSections);
  let searchKey = (search.split("=")[1] || sectionKeys[0]) as SectionKeys<T>;
  const [currentSectionKey, setCurrentSectionKey] = useState<SectionKeys<T>>(searchKey);
  let currentIndex = sectionKeys.indexOf(currentSectionKey);

  const handleSectionChange = (sectionKey: SectionKeys<T>) => {
    setCurrentSectionKey(sectionKey);
  };

  const handleCompletion = () => {
    setupSections[currentSectionKey as SectionKeys<T>].completed = true;
  };

  useEffect(() => {
    setCurrentSectionKey(searchKey);
  }, [searchKey]);

  const updateSearchParams = useCallback((section: SectionKeys<T>) => {
    const params = new URLSearchParams({ section });
    navigate({ pathname: pathname, search: params.toString() }, { replace: true });
  }, []);

  useEffect(() => {
    updateSearchParams(currentSectionKey as SectionKeys<T>);
  }, [currentSectionKey]);

  const handleNext = () => {
    if (sectionKeys.length - 1 > currentIndex) {
      updateSearchParams(sectionKeys[currentIndex + 1] as SectionKeys<T>);

      handleCompletion();
    }
  };

  const handlePrevious = () => {
    if (sectionKeys.length - 1 > 0) {
      updateSearchParams(sectionKeys[--currentIndex] as SectionKeys<T>);

      setupSections[currentSectionKey as SectionKeys<T>].completed = false;
    }
  };

  return {
    currentSectionKey,
    onSectionChange: handleSectionChange,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onComplete: handleCompletion,
    sections: setupSections,
  };
}
