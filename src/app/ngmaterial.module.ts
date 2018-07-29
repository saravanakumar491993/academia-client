import {MatButtonModule, MatNativeDateModule , MatCheckboxModule, MatIcon, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatDialogModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatListModule, MatPaginatorModule, MatTooltipModule, MatRadioModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
 
  exports: 
    [
        //angular material
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
        MatListModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatRadioModule
    ],
})
export class NgMaterialModule { }