import { CommonClass } from './../../../commonUrl/common-url'
import { HttpClient,HttpHeaders } from '@angular/common/http'
//validators
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FileNameValidator{
    URL=CommonClass.commonUrl;
    http: HttpClient;
    token= localStorage.getItem('token');
    head = {
         headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`),
        }
    //when we want to get result from server and want to 
    //await for asynochronous call we should use the Promise
    shouldUnique(control:AbstractControl): Promise< ValidationErrors |null > {
    
        return new Promise((resolve,reject)=>{

        this.http.post(this.URL+'files/filename',control.value,this.head)
		.subscribe(
            res => resolve(null),
            error=>resolve({shouldUnique:true})
        );
        

        })
    
   
    }
    //     return new Promise((resolve,reject)=>{
        // setTimeout(()=>{
            // if(control.value === 'shahzad') resolve({shouldUnique:true});
            //  else resolve(null);
        // },2000)
    // });

}