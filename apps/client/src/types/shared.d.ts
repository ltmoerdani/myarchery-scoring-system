// Global type declaration for shared types (auto-imported by TS)
import type { ScoringEvent, User } from '@archery/shared';

declare global {
  type ScoringEvent = import('@archery/shared').ScoringEvent;
  type User = import('@archery/shared').User;
}
