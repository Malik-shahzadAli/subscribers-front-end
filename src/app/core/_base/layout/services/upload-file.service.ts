// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonClass } from './../../../../commonUrl/common-url'
let url=CommonClass.commonUrl;
const API_DATATABLE_URL = url+'/files/upload';
@Injectable()
export class UploadFileService {
	constructor(private http: HttpClient) { }
	uploadData(body) {
		return this.http.post(API_DATATABLE_URL,body);
	}
}
