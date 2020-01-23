// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AllFilesComponent } from './dashboard.component';



// @NgModule({
//   declarations: [AllFilesComponent],
//   imports: [
//     CommonModule
//   ]
// })
// export class DashboardModule { }
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { AllFilesComponent } from './all-files.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: AllFilesComponent
			},
		]),
	],
	providers: [],
	declarations: [
		AllFilesComponent,
	]
})
export class AllFilesModule {
}
