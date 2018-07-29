import { IAuditable } from "./contract/iauditable";
import { User } from "./user";
import { Person } from "./person";
import { PhoneType } from "../constants/person.constants";

export class PhoneNumber implements IAuditable {
    id: number;
    ownerId: number;    
    number: string;
    isPrimary: boolean;
    phoneType: PhoneType
    
    //IAuditable Impl
    createdTime: Date;
    updatedTime: Date;
    updatedBy: number;
    updatedUser: User;

    //navigation property
    owner: Person;
}
