import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, HostListener } from '@angular/core';
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
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CommonClass } from './commonUrl/common-url';
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
	URL = CommonClass.commonUrl;
	manyToolsUrl = 'https://account.manytools.io';
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
		// this.loadGUI()
		 const token = localStorage.getItem('token');
		 console.log(token);
		 if (token) {
			this.loader = this.layoutConfigService.getConfig('loader.enabled');
			 this.validateToken(token)
		 }

		 else{
		// 	// window.location.href='https://account.manytools.io/'
		 this.loader = this.layoutConfigService.getConfig('loader.enabled');
			 setTimeout(() => {
				let iframe = document.getElementsByTagName('iframe')[0];
				let win;
				try {
					console.log('**** POST A MESSAGE ****')
					win = iframe.contentWindow;
					win.postMessage("Child Data", this.manyToolsUrl);
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
	  if (e.origin !== this.manyToolsUrl) {
		return false;
	  }
	//   If Found message from the accounts.manytools.io
	  if(e.data && (e.data.length > 0) && (e.data !== undefined)) {
		  console.log('In upper If condition');
		  if (e.data != null) {
			console.log('In If condition ');
			console.log("After Checks : ", e.data);
			const data: string = e.data;
			// if (data !== 'logout') {
				this.validateToken(data);
			// }
			// else{
				// localStorage.clear();
			// }
		  }
		  else{
			//   window.location.assign('https://account.manytools.io/')
			window.location.assign(this.manyToolsUrl);
		  }
	  }
	  else{
		  window.location.assign(this.manyToolsUrl);
	  }
	}

	//validate token function
	validateToken(token){
		//sending new token in header
		const newToken=`Bearer ${token}`
		const options = {
			headers: new HttpHeaders().append('Authorization',newToken ),
		  }
		  //loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');
		//sending a post request
		this.http.post(this.URL+'/users/login',{},options)
		.subscribe(
			(res)=>{
				//setting token in the local stroge
				localStorage.setItem('token',res['token'])
				console.log(res)
				//parsing jwt token
				//calling a function which parse the jwt
				this.JWTParsing(res['token'])
			},
			error => {
				//if error redirect the user to accounts.manytools.io
				window.location.assign(this.manyToolsUrl);
			}
		)
	}


	JWTParsing(JWT){
		//loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');
		//setting thr header
		const head = {
			//appending the header
			headers: new HttpHeaders().append('Authorization', `Bearer ${JWT}`),
		  }

		  //passing the jwt token for verification and parsing
		  this.http.get(this.URL+'/users/verify/token',head)
		  .subscribe(
			  res=>{
				  localStorage.setItem('userId',res['_id'])
				  //if response loading the gui
				  this.loadGUI()
				},
				error=>{
					window.location.assign(this.manyToolsUrl);
				}
		  )

	}

//loading the gui on window
	loadGUI(){
		//hiding the splash screen
		this.splashScreenService.hide();
		//window scroll at the top
		window.scrollTo(0, 0);
		//adding the content class on the document body
		document.body.classList.add('kt-page--loaded');

	}

}
