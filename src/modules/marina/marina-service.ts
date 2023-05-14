import { IOccupations } from '../occupations/occupations-model';
import { BoatType, IMarina } from './marina-model';

interface IOccupancyStats {
    amount: number;
    boatType: BoatType;
}
class MarinaService {
    calculateOccupancyForMarina = (occupancy: IOccupations[], marina, isForClient: boolean) => {
        const speedBoatAmount = occupancy.filter((occupation) => occupation.boatType === BoatType.SPEED_BOAT).length;

        const smallBoatAmount = occupancy.filter((occupation) => occupation.boatType === BoatType.SMALL_BOAT).length;
        const sailBoatAmount = occupancy.filter((occupation) => occupation.boatType === BoatType.SAIL_BOAT).length;
        const yachtAmount = occupancy.filter((occupation) => occupation.boatType === BoatType.YACHT).length;
        const ferryAmount = occupancy.filter((occupation) => occupation.boatType === BoatType.FERRY).length;

        return [
            { amount: speedBoatAmount, boatType: isForClient ? 'Speed boat' : BoatType.SPEED_BOAT, maxAmount: marina.maxNumberOfSpeedBoats },
            { amount: smallBoatAmount, boatType: isForClient ? 'Small boat' : BoatType.SMALL_BOAT, maxAmount: marina.maxNumberOfSmallBoats },
            { amount: sailBoatAmount, boatType: isForClient ? 'Sail boat' : BoatType.SAIL_BOAT, maxAmount: marina.maxNumberOfSailBoats },
            { amount: yachtAmount, boatType: isForClient ? 'Yacht' : BoatType.YACHT, maxAmount: marina.maxNumberOfYachts },
            { amount: ferryAmount, boatType: isForClient ? 'Ferry' : BoatType.FERRY, maxAmount: marina.maxNumberOfFerries }
        ];
    };
}

export const marinaService = new MarinaService();
