import { IsString } from 'class-validator';

class FindOneSlugParams {
  @IsString()
  nameId: string;
}

export default FindOneSlugParams;
