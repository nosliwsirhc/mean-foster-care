import { IUser } from './user.interface';

export interface IRegisterUser extends IUser {
  password: string;
}
