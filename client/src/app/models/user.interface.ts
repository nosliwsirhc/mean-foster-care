interface PopulatedManager {
  fullName: string;
}

export interface User {
  _id?: string;
  dateOfBirth: Date;
  email: string;
  fullName?: string;
  gender: string;
  isActive: boolean;
  jobTitle: string;
  manager: PopulatedManager;
  nameGiven: string;
  nameMiddle: string;
  nameFamily: string;
  picture: string;
  roles: string[];
}
