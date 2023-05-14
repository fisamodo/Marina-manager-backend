import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export type UserType = 'admin' | 'employee';

export interface IUser {
    _id: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
    profileImage: string;
    userType: UserType;
    marinaId: ObjectId;
}

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    profileImage: { type: String },
    userType: { type: String, default: 'employee' },
    marinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'marinas' }
});

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'privatekey', { expiresIn: '7d' });
    return token;
};

export const userModel = mongoose.model<IUser, Model<IUser>>('users', userSchema);
