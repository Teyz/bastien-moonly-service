import { PartialType } from '@nestjs/swagger';
import { CreateUserAlerteDto } from './create-user-alerte.dto';

export class UpdateUserAlerteDto extends PartialType(CreateUserAlerteDto) {}
