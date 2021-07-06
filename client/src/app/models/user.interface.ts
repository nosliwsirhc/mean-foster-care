interface PopulatedManager {
  fullName: string;
}

export interface IUser {
  _id?: string;
  dateOfBirth: Date;
  email: string;
  fullName?: string;
  gender: string;
  isActive: boolean;
  isManager: boolean;
  jobTitle: string;
  manager: PopulatedManager;
  nameGiven: string;
  nameMiddle: string;
  nameFamily: string;
  picture: string;
  roles: string[];
}
