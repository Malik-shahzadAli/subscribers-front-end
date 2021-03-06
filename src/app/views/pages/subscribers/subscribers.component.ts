import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient,HttpHeaders } from '@angular/common/http'

import{ CommonClass } from './../../../commonUrl/common-url'

import { MatDialog } from '@angular/material/dialog';
import { PopupWindowComponent } from '../popup-window/popup-window.component';

@Component({
  selector: 'kt-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
 id:any;
 URL=CommonClass.commonUrl;
 token=localStorage.getItem('token')
//  REFREST_URL=URL+'/files/refresh'
  constructor(private params:ActivatedRoute,private http:HttpClient, public dialog:MatDialog) { }

  ngOnInit() {
 
    // console.log(this.URL)
    this.params.queryParamMap.
		subscribe(param=>{
      this.id=param.get('id');
      console.log(this.id)
       localStorage.setItem('id', this.id);
		})
   }
      
    head = {
			headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`),
		}
   refresh(){
    //  console.log('refresh calling')
    this.dialog.open(PopupWindowComponent,{data:{description:'Fetching',content:'We Just start fetching updated data please wait...'}})
    this.http.post(this.URL+'/subscribers/refresh/'+this.id,{},this.head)
    .subscribe(
      res=>console.log(res)
    )
   }
   exportAsCSV(){
    // console.log('csv calling')
    this.http.get(this.URL+'/subscribers/export/csv/'+this.id,this.head)
    .subscribe(
      (res:string)=>{
        console.log(res)
        window.open(this.URL+res, "_blank");
      }

    )
   }
   exportAsJSON(){
    // console.log(this.URL+'/subscribers/export/json/'+this.id);
    this.http.get(this.URL+'/subscribers/export/json/'+this.id,this.head)
    .subscribe(
      (res:string)=>{
        console.log(res)
        window.open(this.URL+res, "_blank");
      }
     
    )
   }

}

