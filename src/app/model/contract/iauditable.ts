import { User } from "../user";

export interface IAuditable{
    createdTime: Date;
    updatedTime: Date;
    updatedBy: number;
    updatedUser: User
}