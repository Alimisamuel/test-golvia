import React from "react";

interface Props {
  value?: string;
}

const FormatProfileType: React.FC<Props> = ({ value }) => {
  const profileLabels: Record<"ATHLETES" | "SCOUT" | "TEAM" | "FANBASE", string> = {
    ATHLETES: "Athlete",
    SCOUT: "Scout",
    TEAM: "Team",
    FANBASE: "Fan",
  };

  const formattedValue = profileLabels[value as keyof typeof profileLabels] || "";

  return formattedValue;
};

export default FormatProfileType;
