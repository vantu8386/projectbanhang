import { DeepPartial } from 'typeorm';
import { UserRole } from '../entity/users.emtity';

export class CreateUserDTO {
  id?: number;
  userName?: string;
  phone?: number;
  email?: string;
  passwords?: string;
  avatarUrl?: string;
  role?: DeepPartial<UserRole>;
  isBlocked?: DeepPartial<boolean>;
}
