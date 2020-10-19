import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import {
  SkillLevel,
  SkillLevelCollection,
} from '../types/technologySkillLevel.types';

class TechnologySkillLevelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, {
    message: '$value, $property, $target, $constraint1',
  })
  @MaxLength(15)
  technology: string;

  @IsEnum(SkillLevel, {
    message: `skillLevel should contain ${SkillLevelCollection}`,
  })
  @IsNotEmpty()
  skillLevel: SkillLevel;
}

export default TechnologySkillLevelDto;
