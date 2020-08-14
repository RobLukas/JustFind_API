import { IsUUID } from 'class-validator';

class UUIDParams {
  @IsUUID()
  id: string;
}

export default UUIDParams;
