import { Address } from "./address";
import { Person } from "./person";
import { AddressType } from "../constants/person.constants";

export class ContactAddress extends Address{
    addressType: AddressType;
    ownerId: number;

    //navigation property
    owner: Person;
}