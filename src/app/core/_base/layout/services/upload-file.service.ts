// Angular
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonClass } from './../../../../commonUrl/common-url'
let url=CommonClass.commonUrl;
const API_DATATABLE_URL = url+'/files/upload';
@Injectable()
export class UploadFileService {
	constructor(private http: HttpClient) { }
	token=localStorage.getItem('token')
	head = {
		//appending the header
	  headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`),
	}
	uploadData(body) {
		return this.http.post(API_DATATABLE_URL,body,this.head);
	}
}
