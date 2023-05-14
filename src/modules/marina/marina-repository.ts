import { marinaModel } from './marina-model';

export class MarinaRepository {
    find(filter) {
        return marinaModel.find(filter);
    }
    findById(id) {
        return marinaModel.findById(id);
    }
    create(data) {
        return marinaModel.create(data);
    }
    update(filter, data) {
        return marinaModel.updateOne(filter, { $set: data });
    }
}

export const marinaRepository = new MarinaRepository();
