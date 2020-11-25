import mongoose, { Schema, Document } from 'mongoose'

export interface SpeedTestDocument extends Document {
  downloadSpeed: number | null
  uploadSpeed: number | null
  downloadUnit: string | null
  uploadUnit: string | null
  ip: string | null
  ping: number | null
  pingUnit: string | null
  requestLocation: string | null
  serverLocation: string | null
  service: string | null
  serviceLocation: string | null
  dateTime: Date | null
}

const SpeedTestSchema = new Schema({
  downloadSpeed: Number,
  uploadSpeed: Number,
  downloadUnit: String,
  uploadUnit: String,
  ip: String,
  ping: Number,
  pingUnit: String,
  requestLocation: String,
  serverLocation: String,
  service: String,
  serviceLocation: String,
  dateTime: Date
}, {
  timestamps: true
})

export default mongoose.model<SpeedTestDocument>('SpeedTest', SpeedTestSchema)
