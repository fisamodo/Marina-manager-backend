import mongoose, { Model } from 'mongoose';

export interface IOccupations {
    registrationNumber: string;
    isUsingElectricPort: boolean;
    isUsingWaterPort: boolean;
    boatType: number;
    marinaId: string;
}

export enum BoatType {
    SPEED_BOAT,
    SMALL_BOAT,
    SAIL_BOAT,
    YACHT,
    FERRY
}

const occupationsScema = new mongoose.Schema({
    registrationNumber: { type: String },
    isUsingElectricPort: { type: Boolean, default: false },
    isUsingWaterPort: { type: Boolean, defaulst: false },
    boatType: { type: Number },
    marinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'marinas' }
});

export const occupationsModel = mongoose.model<IOccupations, Model<IOccupations>>('occupations', occupationsScema);
