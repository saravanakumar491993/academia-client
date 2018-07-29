import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../model/student';
import { NamePrefix, NameSuffix, BloodGroup, CountryCode, MaritalStatus, PhoneType } from '../../../constants/person.constants';
import { ToArray } from '../../../helper/enum-helper';
import { ContactAddress } from '../../../model/contactaddress';
import { PhoneNumber } from '../../../model/phonenumber';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Input()
  public student: Student = new  Student();

  @Output()
  formSubmitted: EventEmitter<Student> = new EventEmitter();

  public namePrefixes = [];
  public nameSuffixes = [];
  public bloodGroupes = [];
  public countryCodes = [];
  public maritalStatuses = [];
  public phoneTypes = [];
  
  constructor(
  ) {
    this.namePrefixes = ToArray(NamePrefix)
    this.nameSuffixes = ToArray(NameSuffix)
    this.bloodGroupes = ToArray(BloodGroup)
    this.countryCodes = ToArray(CountryCode)
    this.maritalStatuses = ToArray(MaritalStatus)
    this.phoneTypes = ToArray(PhoneType)

    this.student.addresses = [new ContactAddress()]

    var phoneNumber = new PhoneNumber();
    phoneNumber.isPrimary = true;
    this.student.phoneNumbers = [ phoneNumber ]
    
  }

  ngOnInit() {
  }

  submitHandler() { 
    alert(JSON.stringify(this.student));
    this.formSubmitted.emit(this.student);
  }

  addPhone() {
    this.student.phoneNumbers.push(new PhoneNumber());
  }
  markFavorite(phoneNumber: PhoneNumber) {
    this.student.phoneNumbers.map(t => t.isPrimary = false);
    phoneNumber.isPrimary = true;
  }

  removePhoneNumber(index: number) {
    this.student.phoneNumbers.splice(index, 1)
  }
}
