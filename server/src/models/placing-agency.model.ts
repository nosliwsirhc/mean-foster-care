import { model, Schema, Document } from 'mongoose'

export interface IPlacingAgency {
  name: string
  logo: string
  street1?: string
  street2?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
  fax?: string
  mileageRate?: number
  mileageCostShare?: number
  mileageExclusionPolicy?: string
  emailPolicy?: string
  activePlacements: string[]
  dischargedPlacements: string[]
}

interface PlacingAgencyDocument extends IPlacingAgency, Document {
  addPlacement(userId: string): void
  dischargePlacement(userId: string): void
}

const PlacingAgencySchema = new Schema<PlacingAgencyDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    logo: String,
    street1: String,
    street2: String,
    city: String,
    province: String,
    postalCode: String,
    phone: String,
    fax: String,
    mileageRate: Number,
    mileageCostShare: Number,
    mileageExclusionPolicy: String,
    emailPolicy: String,
    activePlacements: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    dischargedPlacements: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

PlacingAgencySchema.methods.addPlacement = function (clientId: string) {
  const exists = this.activePlacements.includes(clientId)
  if (exists) return
  this.activePlacements.push(clientId)
}

PlacingAgencySchema.methods.dischargePlacement = function (clientId: string) {
  this.activePlacements = this.activePlacements.filter((id) => id !== clientId)
  this.dischargedPlacements.push(clientId)
}

export default model('PlacingAgency', PlacingAgencySchema)
