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
import { HttpClient, HttpHeaders } from '@angular/common/http'
import{ CommonClass } from './commonUrl/common-url'
// import { HttpHeaders } from '@angular/common/http';

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
	URL=CommonClass.commonUrl;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	
	constructor(private translationService: TranslationService,
				private router: Router,
				private layoutConfigService: LayoutConfigService,
				private splashScreenService: SplashScreenService,
				private http:HttpClient) {

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
	//   If Found message from the accounts.manytools.io
	  if(e.data && (e.data.length > 0) && (e.data != undefined)){
		  
		  if(e.data != null){
			console.log("After Checks : ",e.data);
			//if found token 
			this.validateToken(e.data)
		  }
		  //if found null from the accounts.manytools.io
		  else{
			window.location.href='https://account.manytools.io/'
		  }
	  }
	}



	validateToken(token){
		// const httpOptions = {
		// 	headers: new HttpHeaders({
		// 	 'Authorization': "Bearer "+token,
		// 	 dataType: 'json',
        //    	 contentType: "application/json",
		// 	})
		//   };
		var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
		this.http.post(this.URL+'/users/login',headers_object)
		.subscribe(
			(res:string)=>{
				localStorage.setItem('token',res)
				console.log(res)
				this.JWTParsing(res)
			},
			error=>{
				window.location.href='https://account.manytools.io/'
			}
		)
	}


	JWTParsing(JWT){
		// const httpOptions = {
		// 	headers: new HttpHeaders({
		// 	 Authorization: "Bearer "+JWT,
		// 	 dataType: 'json',
		// 	contentType: "application/json",
		// 	})
		//   };
		var headers_object = new HttpHeaders().set("Authorization", "Bearer " + JWT);
		  this.http.get(this.URL+'/users/verify/token',headers_object)
		  .subscribe(
			  res=>console.log(res)
		  )

	}
	
}
