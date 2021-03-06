
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
import { LogoutComponent } from './views/pages/logout/logout.component';
// Auth


const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'allFiles',
				loadChildren: () => import('app/views/pages/all-files/all-files.module').then(m => m.AllFilesModule)
			},
			{
				path:'uploadFile',
				loadChildren:()=> import('app/views/pages/upload-file/upload-file.module').then(m =>m.TryModule)
			},
			{
				path:'subscribers',
				loadChildren:()=> import('app/views/pages/subscribers/subscribers.module').then(m=>m.SubscribersModule)
			},
			{
				path:'updateFile',
				loadChildren:()=> import('app/views/pages/update-file/update-file.module').then(m=>m.UpdateFileModule)
			},
			{
				path:'logout',
				component: LogoutComponent
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'uploadFile', pathMatch: 'full'},
			{path: '**', redirectTo: 'uploadFile', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
