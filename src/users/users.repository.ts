import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemes/user.scheme";
import { FilterQuery, Model } from "mongoose";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserRepository {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findById(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findById(userFilterQuery);
    }

    async findByEmail(email: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne({ email: email });
    }

    async create(user: User): Promise<User> {
        return new this.userModel(user).save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }

}