import { userModel } from './user-model';

export class UserRepository {
    findOne(filter) {
        return userModel.findOne(filter);
    }
    async create(data) {
        return await userModel.create(data);
    }
}

export const userRepository = new UserRepository();
