import { model, Schema, Document } from 'mongoose'

interface Client {
  nameGiven: string
  nameMiddle?: string
  nameFamily: string
  dateOfBirth: Date
  gender: string
  religion: string
  ethnicity: string
  fnim: boolean
  currentPlacement: Placement
  previousPlacements: Placement[]
  careStatus: CareStatus
  previousCareStatus: CareStatus[]
}

interface Placement {
  placingAgency: string
  placingAgencyName: string
  fosterHome: string
  fosterHomeName: string
  dateOfPlacement: Date
  dateOfDischarge?: Date
}

interface CareStatus {
  status: Status
  dateStart: Date
  dateEnd?: Date
}

enum Status {
  TCA = 'Temporary Care Agreement',
  ECS = 'Extended Society Care',
  ISC = 'Interim Society Care',
  CC = 'Customary Care',
  OTHER = 'Other',
}

interface ClientDocument extends Client, Document {
  fullName: string
}

const PlacementSchema = new Schema<Placement>({
  placingAgency: { type: Schema.Types.ObjectId, ref: 'PlacingAgency' },
  placingAgencyName: String,
  fosterHome: { type: Schema.Types.ObjectId, ref: 'FosterHome' },
  fosterHomeName: String,
  dateOfPlacement: Date,
  dateOfDischarge: Date,
})

const CareStatusSchema = new Schema<CareStatus>({
  status: String,
  dateStart: Date,
  dateEnd: Date,
})

const ClientSchema = new Schema<ClientDocument>(
  {
    nameGiven: {
      type: String,
      required: true,
    },
    nameMiddle: String,
    nameFamily: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    religion: String,
    ethnicity: String,
    language: String,
    placeOfBirth: String,
    fnim: Boolean,
    currentPlacement: PlacementSchema,
    previousPlacements: [PlacementSchema],
    careStatus: CareStatusSchema,
    previousCareStatus: [CareStatusSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ClientSchema.virtual('fullName').get(function (this: ClientDocument) {
  let fullName = ''
  if (this.nameGiven) {
    fullName += this.nameGiven
  }
  if (this.nameMiddle) {
    fullName += ` ${this.nameMiddle}`
  }
  if (this.nameFamily) {
    fullName += ` ${this.nameFamily}`
  }
  return fullName
})

export default model('Client', ClientSchema)
