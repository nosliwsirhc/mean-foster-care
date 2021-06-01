import { model, Schema, Document } from 'mongoose'

interface FosterHome extends Document {
  name: string
}

const FosterHomeSchema = new Schema<FosterHome>({
  name: {
    type: String,
    required: true,
  },
})

export default model('FosterHome', FosterHomeSchema)
