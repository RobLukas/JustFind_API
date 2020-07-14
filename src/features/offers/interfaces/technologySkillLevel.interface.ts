enum SkillLevels {
  'Nice to have',
  'Junior',
  'Regular',
  'Senior',
  'Expert',
}

export interface TechnologySkillLevel {
  technology: string;
  skillLevel: SkillLevels;
}
