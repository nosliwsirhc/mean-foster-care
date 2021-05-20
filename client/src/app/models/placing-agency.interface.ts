export interface IPlacingAgency {
  _id?: string;
  name: string;
  logo?: string;
  street1?: string;
  street2?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
  fax?: string;
  mileageRate?: number;
  mileageCostShare?: number;
  mileageExclusionPolicy?: string;
  emailPolicy?: string;
  activePlacements: string[];
  dischargedPlacements: string[];
}
