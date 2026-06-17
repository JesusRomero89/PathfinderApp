import { Proficiency } from '../types/character';

export const STORAGE_KEY = '@pathfinder_native_multicharacter_v13';

export const COMPETENCE_BONUS: Record<Proficiency, number> = {
  untrained: 0,
  trained: 2,
  expert: 4,
  master: 6,
  legendary: 8,
};

export const PROF_LABELS: { label: string; value: Proficiency }[] = [
  { label: 'S', value: 'untrained' },
  { label: 'E', value: 'trained' },
  { label: 'EX', value: 'expert' },
  { label: 'M', value: 'master' },
  { label: 'L', value: 'legendary' },
];