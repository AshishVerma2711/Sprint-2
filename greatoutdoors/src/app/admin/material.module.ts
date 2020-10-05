import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list'; 

@NgModule({
    imports: [
        MatGridListModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTabsModule,
        MatDividerModule,
        MatSliderModule,
        MatSelectModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule],

    exports: [
        MatGridListModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatDividerModule,
        MatSliderModule,
        MatSelectModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSortModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
    ],
})

export class MyMaterialModule { }