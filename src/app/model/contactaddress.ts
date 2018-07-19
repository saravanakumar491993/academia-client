import { Address } from "./address";
import { Person } from "./person";

export class ContactAddress extends Address{
    addressType: AddressType;
    ownerId: number;

    //navigation property
    owner: Person;
}