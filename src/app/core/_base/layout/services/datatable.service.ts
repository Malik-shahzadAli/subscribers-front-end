// Angular
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Models
import { DataTableItemModel } from '../models/datatable-item.model';
import { CommonClass } from './../../../../commonUrl/common-url'

let url=CommonClass.commonUrl
let userId=CommonClass.userId
const API_DATATABLE_URL = url+'/files/';
const DELETE_FILE_URL=url+'/files';
const UPDATE_FILE_URL=url+'/files/update'
const GET_FILE=url+'/files/getFile'

@Injectable()
export class DataTableService {
	/**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Returns data from fake server
	 */
	token=localStorage.getItem('token')
	head = {
		//appending the header
	  headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`),
	}
	getAllItems(): Observable<DataTableItemModel[]> {
		return this.http.get<DataTableItemModel[]>(API_DATATABLE_URL,this.head);
	}
	deleteFile(fileId){
		return this.http.delete(DELETE_FILE_URL+'/'+fileId,this.head);
	}
	updateFile(fileId,updateDate){
		return this.http.patch(UPDATE_FILE_URL+'/'+fileId,updateDate,this.head);
	}
	getFile(fileId){
		return this.http.get(GET_FILE+'/'+fileId,this.head)
	}
}
