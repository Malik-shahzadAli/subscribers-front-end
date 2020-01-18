import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateFileComponent } from './update-file.component';
import { RouterModule } from '@angular/router';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateFileComponent],
  imports: [
    CommonModule,
    CoreModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
			{
				path: '',
				component: UpdateFileComponent
			},
		]),
  ]
})
export class UpdateFileModule { }
