import { IAuditable } from "./contract/iauditable";
import { User } from "./user";

export abstract class Address implements IAuditable {
    id: number;
    lineOne: string;
    lineTwo: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: CountryCode;

    //IAuditable Impl
    createdTime: Date;
    updatedTime: Date;
    updatedBy: number;
    updatedUser: User;
}