import mongoose, { Model } from 'mongoose';

export interface IOccupations {
    registrationNumber: string;
    isUsingElectricPort: boolean;
    isUsingWaterPort: boolean;
    boatType: BoatType;
    marinaId: string;
}

export interface IOccupationDropdownOption {
    label: string;
    value: any;
}

export interface IOccupancy {
    amount: number;
    boatType: string | BoatType;
    maxAmount: any;
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
    boatType: { type: Object },
    marinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'marinas' }
});

export const occupationsModel = mongoose.model<IOccupations, Model<IOccupations>>('occupations', occupationsScema);
