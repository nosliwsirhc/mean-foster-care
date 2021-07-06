import Joi from 'joi'
import { IPlacingAgency } from '../../models/placing-agency.model'

export const newPlacingAgencySchema = Joi.object<IPlacingAgency>({
  name: Joi.string().required(),
  logo: Joi.string(),
  street1: Joi.string(),
  street2: Joi.string(),
  city: Joi.string(),
  province: Joi.string(),
  postalCode: Joi.string(),
  phone: Joi.string(),
  fax: Joi.string(),
  mileageRate: Joi.number(),
  mileageCostShare: Joi.number(),
  mileageExclusionPolicy: Joi.string(),
  emailPolicy: Joi.string(),
  activePlacements: Joi.array(),
  dischargedPlacements: Joi.array(),
})
