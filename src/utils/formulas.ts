import { CharacterSheet, Proficiency } from '../types/character';
import { COMPETENCE_BONUS } from '../constants/rules';

export const initialSkill = () => ({ prof: 'untrained' as Proficiency, item: 0, armorPen: 0 });
export const initialSave = (p: Proficiency = 'untrained') => ({ prof: p, item: 0 });

export const defaultFeatsText = 
`• Dientes Afilados (Linaje 1): Ataque natural de mandíbula (1d6 perf.) con daño de Furia.
• Duro de Matar (General 1): Solo mueres al alcanzar Moribundo 5. Colchón contra críticos.
• Rastreador Experimentado (Habilidad 1): Rastreas a velocidad completa usando Supervivencia.
• Mirada Intimidante (Habilidad 2): Desmoraliza con los ojos. Ignora barreras de idioma y el penalizador de -2.`;

export const createNewCharacter = (name = "Nuevo Aventurero"): CharacterSheet => ({
  id: Date.now().toString(),
  name,
  level: 1,
  ancestrality: "Humano",
  heritage: "Versátil",
  size: "Medio",
  className: "Guerrero",
  heroPoints: 1,
  hpCurrent: 20,
  hpMax: 20,
  hpTemp: 0,
  dying: 0,
  wounded: 0,
  speed: 9,
  armorItemBonus: 0,
  armorProficiency: 'trained',
  perceptionProf: 'trained',
  perceptionItem: 0,
  strength: 2,
  dexterity: 2,
  constitution: 2,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
  fortitude: initialSave('trained'),
  reflexes: initialSave('trained'),
  will: initialSave('trained'),
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
  featsText: "• Dote Inicial: Añade tus dotes aquí.",
});

export const getProfBonus = (prof: Proficiency, level: number): number => {
  return COMPETENCE_BONUS[prof] > 0 ? COMPETENCE_BONUS[prof] + level : 0;
};

export const calculateAC = (char: CharacterSheet): number => {
  return 10 + char.dexterity + char.armorItemBonus + getProfBonus(char.armorProficiency, char.level);
};