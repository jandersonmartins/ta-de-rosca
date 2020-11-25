import mongoose, { Schema, Document } from 'mongoose'

export interface SpeedTestDocument extends Document {
  downloadSpeed: number
  uploadSpeed: number
  downloadUnit: string
  uploadUnit: string
  ip: string
  ping: number
  pingUnit: string
  requestLocation: string
  serverLocation: string
  service: string
  serviceLocation: string
  dateTime: Date
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
