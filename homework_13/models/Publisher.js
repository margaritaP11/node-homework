import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
})
export const Publisher = mongoose.model('Publisher', publisherSchema)
