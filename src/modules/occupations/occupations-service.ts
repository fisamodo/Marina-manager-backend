import { IMarina } from '../marina/marina-model';
import { BoatType, IOccupancy, IOccupationDropdownOption, IOccupations } from './occupations-model';

class OccupationsService {
    extractBoatTypeFromDropdownOption = (boatType: IOccupationDropdownOption) => {
        return boatType.value;
    };

    checkIfOccupationIsPossible = (marina: IMarina | any, occupancy: IOccupancy[], boatType: BoatType) => {
        const currentOccupancyState = occupancy.find((occupancyCondition) => occupancyCondition.boatType === boatType)!;

        return currentOccupancyState;
    };
}

export const occupationsService = new OccupationsService();
