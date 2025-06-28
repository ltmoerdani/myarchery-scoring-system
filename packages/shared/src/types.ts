// Deprecated: use explicit imports from events/* and validation/*
export * from './events/scoring';
export * from './events/user';

// Shared types for FE-BE contract

export interface ScoringEvent {
  athleteId: string;
  score: number;
  ring: number;
  isX?: boolean;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'archer' | 'dos';
}
