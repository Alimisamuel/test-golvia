export interface Challenge {
  id: number;
  title: string;
  mediaType: "IMAGE" | "VIDEO";
  description: string;
  sponsors: string[];
  hasJoined: boolean;
  hasSubmitted: boolean;
  startDate: string;
  endDate: string;
}

export interface Leaderboard {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
    connections: number;
  };
  creatives: number;
  likes: number;
}

export interface ChallengeResponse {
  data: Challenge;
}