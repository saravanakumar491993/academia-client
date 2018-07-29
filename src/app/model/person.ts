import { IAuditable } from "./contract/iauditable";
import { User } from "./user";
import { PhoneNumber } from "./phonenumber";
import { ContactAddress } from "./contactaddress";
import { NamePrefix, NameSuffix, Gender, BloodGroup, CountryCode, MaritalStatus, PersonStatus } from "../constants/person.constants";

export abstract class Person implements IAuditable {
    id: number;
    prefix: NamePrefix;
    suffix: NameSuffix;
    initial: string;
    firstName: string;
    lastName: string;
    middleName: string;
    nickName: string;
    gender: Gender;
    dob: Date;
    bloodGroup: BloodGroup;
    countryCode: CountryCode;
    photoUrl: string;
    maritalStatus: MaritalStatus;
    spouseName: string;
    referredBy: number;
    personStatus: PersonStatus;

    //IAuditable Impl
    createdTime: Date;
    updatedTime: Date;
    updatedBy: number;
    updatedUser: User;

    //navigation property
    referredPerson: Person;
    phoneNumbers: PhoneNumber[];
    addresses: ContactAddress[];

}
