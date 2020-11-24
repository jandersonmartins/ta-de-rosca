import mongoose, { Schema, Document } from 'mongoose'

export interface SpeedTestDocument extends Document {
  downloadSpeed: number
  uploadSpeed: number
  downloadUnit: string
  uploadUnit: string
  dateTime: Date
}

const SpeedTestSchema = new Schema({
  downloadSpeed: Number,
  uploadSpeed: Number,
  downloadUnit: String,
  uploadUnit: String,
  dateTime: Date
}, {
  timestamps: true
})

export default mongoose.model<SpeedTestDocument>('SpeedTest', SpeedTestSchema)
