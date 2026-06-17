export type Proficiency = 'untrained' | 'trained' | 'expert' | 'master' | 'legendary';

export interface SkillData {
  prof: Proficiency;
  item: number;
  armorPen: number;
}

export interface SavingThrowData {
  prof: Proficiency;
  item: number;
}

export interface AttackData {
  weapon: string;
  attrType: 'FUE' | 'DES';
  prof: Proficiency;
  item: number;
  diceCount: number;
  diceSize: string;
  specDamage: number;
}

export interface CharacterSheet {
  id: string;
  name: string;
  level: number;
  ancestrality: string;
  heritage: string;
  size: string;
  className: string;
  heroPoints: number;
  hpCurrent: number;
  hpMax: number;
  hpTemp: number;
  dying: number;
  wounded: number;
  speed: number;
  armorItemBonus: number;
  armorProficiency: Proficiency;
  perceptionProf: Proficiency;
  perceptionItem: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  fortitude: SavingThrowData;
  reflexes: SavingThrowData;
  will: SavingThrowData;
  acrobatics: SkillData;
  arcana: SkillData;
  athletics: SkillData;
  diplomacy: SkillData;
  deception: SkillData;
  stealth: SkillData;
  intimidation: SkillData;
  thievery: SkillData;
  crafting: SkillData;
  medicine: SkillData;
  nature: SkillData;
  occultism: SkillData;
  performance: SkillData;
  religion: SkillData;
  society: SkillData;
  survival: SkillData;
  meleeAttacks: AttackData[];
  featsText: string;
}