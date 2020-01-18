// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { SubscribersModel } from '../models/subscribers.model';
import { CommonClass } from './../../../../commonUrl/common-url'

let url=CommonClass.commonUrl;
const API_DATATABLE_URL = url+'/subscribers/';

@Injectable()
export class SuscribersService {
	/**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Returns data from fake server
	 */
  
	getSubscribers(id): Observable<SubscribersModel[]> {
		return this.http.get<SubscribersModel[]>(API_DATATABLE_URL+id);
	}
}
