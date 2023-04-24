import { userModel } from './user-model';

export class UserRepository {
    find(filter) {
        return userModel.find(filter);
    }
    findOne(filter) {
        return userModel.findOne(filter);
    }
    create(data) {
        return userModel.create(data);
    }
    update(filter, data) {
        return userModel.updateMany(filter, { $set: data });
    }
}

export const userRepository = new UserRepository();
