import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'kt-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  @HostListener('window:message', ['$event'])

  onMessage(e) {
		if (e.origin !== "https://account.manytools.io") {
			return false;
		}
		console.log ("Root origin pass");
		if(e.data === 'logout')
		{
			localStorage.clear();

    }
	}
}
