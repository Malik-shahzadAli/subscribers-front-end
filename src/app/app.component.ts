import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
// language list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'Metronic';
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	
	constructor(private translationService: TranslationService,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService) {

		// register translations
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
	}

	ngOnInit(): void {
		 let token=localStorage.getItem('token')
		 if(token){
			this.loader = this.layoutConfigService.getConfig('loader.enabled');
			//call validate function and pass the found token for verification
			const routerSubscription = this.router.events.subscribe(event => {
				if (event instanceof NavigationEnd) {
					// hide splash screen
					this.splashScreenService.hide();
	
					// scroll to top on every route change
					window.scrollTo(0, 0);
	
					// to display back the body content
					setTimeout(() => {
						document.body.classList.add('kt-page--loaded');
					}, 500);
				}
			});
			this.unsubscribe.push(routerSubscription);
			 
			
		 }

		 else{
		// 	// window.location.href='https://account.manytools.io/'
		// 	// this.loader = this.layoutConfigService.getConfig('loader.enabled');
			setTimeout(() => {
				let iframe = document.getElementsByTagName('iframe')[0];
				let win;
				try {
					console.log('**** POST A MESSAGE ****')
					win = iframe.contentWindow;
					win.postMessage("Child Data", "https://account.manytools.io");
				} catch(e) {
					win = iframe.contentWindow;
					console.log(e)
				}
			}, 10000);
		 }

	}
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
	// PLEASE UNCOMMENT AFTER DELETE AND UPDATE
	@HostListener('window:message', ['$event'])
	onMessage(e) {
	  if (e.origin != "https://account.manytools.io") {
		return false;
	  }
	  if(e.data && (e.data.length > 0) && (e.data != undefined)){
		console.log("After Checks : ",e.data);
	    // again call validation function
	  }
	}
	validateToken(token){
		//token found and send a request for validation

		//if validate run this code 

		


		//else send back to manytool.io
	}
	
}
