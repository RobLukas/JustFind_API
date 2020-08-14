enum SkillLevels {
  Nice_To_Have,
  Junior,
  Regular,
  Senior,
  Expert,
}

export interface TechnologySkillLevel {
  technology: string;
  skillLevel: SkillLevels;
}
