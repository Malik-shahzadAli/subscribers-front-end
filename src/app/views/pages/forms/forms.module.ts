import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormsComponent]
})
export class FormsModule2 { }
