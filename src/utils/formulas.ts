import { CharacterSheet, Proficiency } from '../types/character';
import { COMPETENCE_BONUS } from '../constants/rules';

export const initialSkill = () => ({ prof: 'untrained' as Proficiency, item: 0, armorPen: 0 });
export const initialSave = (p: Proficiency = 'untrained') => ({ prof: p, item: 0 });

// El texto por defecto del códice ahora está completamente limpio
export const defaultFeatsText = "";

export const createNewCharacter = (name = "Nuevo Personaje"): CharacterSheet => ({
  id: Date.now().toString(),
  name,
  level: 1,
  ancestrality: "",
  heritage: "",
  size: "Medio",
  className: "",
  heroPoints: 0,
  hpCurrent: 10,
  hpMax: 10,
  hpTemp: 0,
  dying: 0,
  wounded: 0,
  speed: 9,
  armorItemBonus: 0,
  armorProficiency: 'untrained',
  perceptionProf: 'untrained',
  perceptionItem: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
  fortitude: initialSave('untrained'),
  reflexes: initialSave('untrained'),
  will: initialSave('untrained'),
  acrobatics: initialSkill(),
  arcana: initialSkill(),
  athletics: initialSkill(),
  diplomacy: initialSkill(),
  deception: initialSkill(),
  stealth: initialSkill(),
  intimidation: initialSkill(),
  thievery: initialSkill(),
  crafting: initialSkill(),
  medicine: initialSkill(),
  nature: initialSkill(),
  occultism: initialSkill(),
  performance: initialSkill(),
  religion: initialSkill(),
  society: initialSkill(),
  survival: initialSkill(),
  meleeAttacks: [],
  featsText: "",
});

// --- FÓRMULAS MATEMÁTICAS RESTAURADAS ---

export const getProfBonus = (prof: Proficiency, level: number): number => {
  return COMPETENCE_BONUS[prof] > 0 ? COMPETENCE_BONUS[prof] + level : 0;
};

export const calculateAC = (char: CharacterSheet): number => {
  return 10 + char.dexterity + char.armorItemBonus + getProfBonus(char.armorProficiency, char.level);
};