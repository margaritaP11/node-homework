import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

export const Article = mongoose.model('Article', articleSchema)
