export interface Client {
  _id?: string;
  nameGiven: string;
  nameMiddle?: string;
  nameFamily: string;
  dateOfBirth: Date;
  gender: string;
  religion: string;
  ethnicity: string;
  language: string;
  placeOfBirth: string;
  fnim: boolean;
  currentPlacement: Placement;
  previousPlacements: Placement[];
  careStatus: CareStatus;
  previousCareStatus: CareStatus[];
}

interface Placement {
  placingAgency: string;
  placingAgencyName: string;
  fosterHome: string;
  fosterHomeName: string;
  dateOfPlacement: Date;
  dateOfDischarge?: Date;
}

interface CareStatus {
  status: Status;
  dateStart: Date;
  dateEnd?: Date;
}

enum Status {
  TCA = 'Temporary Care Agreement',
  ECS = 'Extended Society Care',
  ISC = 'Interim Society Care',
  CC = 'Customary Care',
  OTHER = 'Other',
}
