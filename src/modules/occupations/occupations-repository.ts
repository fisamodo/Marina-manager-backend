import { occupationsModel } from './occupations-model';

export class OccupationsRepository {
    find(filter) {
        return occupationsModel.find(filter);
    }
    findOne(filter) {
        return occupationsModel.findOne(filter);
    }
    create(data) {
        return occupationsModel.create(data);
    }
    update(filter, data) {
        return occupationsModel.updateOne(filter, { $set: data });
    }
}

export const occupationsRepository = new OccupationsRepository();
