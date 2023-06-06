interface IDropdownOption {
    label: string;
    value: any;
}

class OccupationsService {
    extractBoatTypeFromDropdownOption = (boatType: IDropdownOption) => {
        return boatType.value;
    };

    checkIfOccupationIsPossible = (marina, occupancy, occupation) => {
        const boatType = occupation.boatType;

        const currentOccupancyState = occupancy.find((occupancyCondition) => occupancyCondition.boatType === boatType.value);
        return currentOccupancyState;
    };
}

export const occupationsService = new OccupationsService();
