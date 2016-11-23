import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    required: true
  },
  shares: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  timestamp: true
})

export default mongoose.model('pin', PostSchema)
