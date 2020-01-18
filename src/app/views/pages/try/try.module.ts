import { FormsModule2 } from './../forms/forms.module';
// import { FormsModule } from '@angular/forms';
// import { AuthModule } from './../auth/auth.module';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TryComponent } from './try.component';

// import { RouterModule } from '@angular/router';


// @NgModule({
//   declarations: [TryComponent],
//   imports: [
//     CommonModule,
//     RouterModule.forChild([
// 			{
// 				path: '',
// 				component: TryComponent
// 			},
// 		]),
//   ],
//   providers: [],

// })
// export class TryModule { }
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { TryComponent } from './try.component';
// import {FormsModule2}
// import { FormsModule}
// import { AuthModule } from './'
// import { AuthModule}
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		FormsModule2,
		RouterModule.forChild([
			{
				path: '',
				component: TryComponent
			},
		]),
	],
	providers: [],
	declarations: [
		TryComponent,
	]
})
export class TryModule {
}
