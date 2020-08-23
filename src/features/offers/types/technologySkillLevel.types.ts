export enum SkillLevel {
  Nice_To_Have = 'Nice to have',
  Junior = 'Junior',
  Regular = 'Regular',
  Senior = 'Senior',
  Expert = 'Expert',
}

export type TechnologySkillLevel = {
  technology: string;
  skillLevel: SkillLevel;
};

export const SkillLevelCollection = [
  'Nice to have',
  'Junior',
  'Regular',
  'Senior',
  'Expert',
];
