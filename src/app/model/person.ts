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

    public GetDisplayCountry() {
        let country: string;
        switch (this.countryCode) {
            case CountryCode.IND:
            default:
                country = "India";
                break;
        }
        return country;
    }

    public GetDisplayPrefix() {
        return NamePrefix[this.prefix];
    }

    public GetDisplaySuffix() {
        return NameSuffix[this.suffix]
    }

    public GetDisplayGender() {
        let gender: string;
        switch (this.gender) {
            case Gender.M:
                gender = "Male"
                break
            case Gender.F:
                gender = "Female"
                break
            case Gender.O:
            default:
                gender = "Others"
                break
        }
        return gender
    }

    public GetDisplayBloodGroup() {
        var arr = BloodGroup[this.bloodGroup].split('_')
        let sign: string;
        if (arr[1] == "Positive")
            sign = "+ve"
        else
            sign = "-ve"
        return arr[0] + " " + sign
    }
}
