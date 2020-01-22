
// Angular
import { Component } from '@angular/core';
import {  FormGroup,FormControl, Validators,FormBuilder} from '@angular/forms';
//
import { CommonClass } from './../../../commonUrl/common-url'
import { HttpClient,HttpHeaders } from '@angular/common/http'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupWindowComponent } from '../popup-window/popup-window.component';
@Component({
  selector: 'kt-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent  {
  error:boolean=false;
  token= localStorage.getItem('token');
  head = {
	//appending the header
	 headers: new HttpHeaders().append('Authorization', `Bearer ${this.token}`),
	}
	constructor(private http: HttpClient,private formBuilder:FormBuilder,public dialog:MatDialog) { }
	URL=CommonClass.commonUrl;
	uploadForm: FormGroup;
	Description:'Uploading';
	content:'Your File is Just start uploading please wait..' ;
	ngOnInit() {
		this.uploadForm = this.formBuilder.group({
			subscriberIds:new FormControl('',[
				Validators.required
			]),
		  fileName: new FormControl('',[
			Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
		]),
		accessToken:new FormControl('',[
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(100)
		]),
		});
	  }
	  onFileSelect(event) {
		if (event.target.files.length > 0) {
		  const file = event.target.files[0];
		  this.uploadForm.get('subscriberIds').setValue(file);
		  const extension = file.name.split('.')[1].toLowerCase();
			if (extension.toLowerCase() !== 'csv') {
				this.uploadForm.controls['subscriberIds'].setErrors({'incorrect': true});
				this.error=true;
			}
			else{
				this.error=false;
			}
		}
	  }
	  onSubmit() {
		const formData = new FormData();
		formData.append('subscriberIds', this.uploadForm.get('subscriberIds').value);
		formData.append('fileName', this.uploadForm.get('fileName').value);
		formData.append('accessToken', this.uploadForm.get('accessToken').value);
		this.dialog.open(PopupWindowComponent,{data:{description:this.Description,content:this.content}})
		this.http.post(this.URL+'/files/upload',formData,this.head)
		.subscribe(
			res => console.log(res)
		);
	  }
	//validator function which genrates the error 
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.uploadForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}


}
