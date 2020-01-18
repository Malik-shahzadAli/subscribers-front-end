// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DashboardComponent } from './dashboard.component';



// @NgModule({
//   declarations: [DashboardComponent],
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
import { DashboardComponent } from './dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
