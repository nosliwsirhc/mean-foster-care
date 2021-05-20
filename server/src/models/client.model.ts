import { model, Schema, Document } from 'mongoose'

interface Client {
  nameGiven: string
  nameMiddle?: string
  nameFamily: string
  dateOfBirth: Date
  gender: string
  religion: string
  ethnicity: string
  placeOfBirth: string
  language: string
  currentPlacingAgency: string
  previousPlacingAgencies: string[]
}

interface ClientDocument extends Client, Document {
  fullName: string
}

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
    placeOfBirth: String,
    language: String,
    currentPlacingAgency: { type: Schema.Types.ObjectId, ref: 'PlacingAgency' },
    previousPlacingAgencies: [
      { type: Schema.Types.ObjectId, ref: 'PlacingAgency' },
    ],
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
