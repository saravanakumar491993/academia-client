import {MatButtonModule, MatNativeDateModule , MatCheckboxModule, MatIcon, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatDialogModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatListModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
 
  exports: 
    [
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatListModule
    ],
})
export class NgMaterialModule { }