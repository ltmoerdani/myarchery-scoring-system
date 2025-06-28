// Type untuk event scoring panahan
export type ScoringEvent = {
  athleteId: string;
  score: number;
  ring: number;
  isX?: boolean;
  timestamp: number;
};
