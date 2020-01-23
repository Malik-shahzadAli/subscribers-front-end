import { FormsModule2 } from '../forms/forms.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { UploadFileComponent } from './upload-file.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		FormsModule2,
		RouterModule.forChild([
			{
				path: '',
				component: UploadFileComponent
			},
		]),
	],
	providers: [],
	declarations: [
		UploadFileComponent,
	]
})
export class TryModule {
}
