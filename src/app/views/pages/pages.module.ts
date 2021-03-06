import { MaterialTableComponent } from './material/data-table/material-table/material-table.component';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { PopupWindowComponent } from './popup-window/popup-window.component';
// import {MaterialTableComponent}

import {MatDialogModule} from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
	declarations: [PopupWindowComponent, LogoutComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MatDialogModule
	],
	providers: []
})
export class PagesModule {
}
