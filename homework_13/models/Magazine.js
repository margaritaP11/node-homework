import mongoose from 'mongoose'

const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  issueNumber: Number,
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true,
  },
})
export const Magazine = mongoose.model('Magazine', magazineSchema)
