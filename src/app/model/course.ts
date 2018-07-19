import { User } from "./user";

export class Course{
    id: number;
    name: string;
    courseCode: string;
    fees: number;
    
    //IAuditable Impl
    createdTime: Date;
    updatedTime: Date;
    updatedBy: number;
    updatedUser: User;
    

}