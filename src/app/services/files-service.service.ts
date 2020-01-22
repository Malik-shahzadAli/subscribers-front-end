import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {
  private url='http://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  getPost(){
    return this.http.get(this.url);
  }
}
