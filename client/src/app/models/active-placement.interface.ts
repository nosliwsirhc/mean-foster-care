export interface IActivePlacement {
  _id: string;
  client: {
    _id: string;
    nameGiven: string;
    nameFamily: string;
  };
  dateOfPlacement: Date;
}
