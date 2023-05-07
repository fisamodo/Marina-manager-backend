import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IMarina {
    _id: string;
    marinaName: string;
    hasElectricPort: boolean;
    hasWaterSource: boolean;
    maxNumberOfSpeedBoats: number;
    maxNumberOfSmallBoats: number;
    maxNumberOfSailBoats: number;
    maxNumberOfYachts: number;
    maxNumberOfFerries: number;
}

const marinaSchema = new mongoose.Schema({
    marinaName: { type: String },
    hasElectricPort: { type: Boolean, default: false },
    hasWaterSource: { type: Boolean, default: false },
    maxNumberOfSpeedBoats: { type: Number },
    maxNumberOfSmallBoats: { type: Number },
    maxNumberOfSailBoats: { type: Number },
    maxNumberOfYachts: { type: Number },
    maxNumberOfFerries: { type: Number }
});

export const marinaModel = mongoose.model<IMarina, Model<IMarina>>('marinas', marinaSchema);
