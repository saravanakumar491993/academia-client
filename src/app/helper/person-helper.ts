import { CountryCode } from "../constants/person.constants";



export class PersonHelper {
    static GetDisplayCountry(code): string {
        let country: string;
        switch (code) {
            case CountryCode.IND:
            default:
                country = "India";
                break;
        }
        return country;
    }
}