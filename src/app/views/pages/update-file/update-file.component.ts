import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {  FormGroup,FormControl, Validators,FormBuilder} from '@angular/forms';

import { HttpClient } from '@angular/common/http'

import { CommonClass } from './../../../commonUrl/common-url'
import { DataTableService } from './../../../core/_base/layout';

@Component({
  selector: 'kt-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.scss']
})
export class UpdateFileComponent implements OnInit {
  id:any;
  uploadForm: FormGroup; 
  error:boolean=false;
  URL=CommonClass.commonUrl;
  files:any;
  fileChange:boolean;

  constructor(private params:ActivatedRoute,private http: HttpClient,private formBuilder:FormBuilder,private service:DataTableService) { }

  ngOnInit() {
    this.params.queryParamMap.
		subscribe(param=>{
      this.id=param.get('id');
    })
    //getting values from services
    this.service.getFile(this.id)
    .subscribe(res=>{
		this.files=res['file'];
		console.log(this.files)
		this.uploadForm.get('fileName').setValue(this.files['fileName']);
		this.uploadForm.get('accessToken').setValue(this.files['accessToken']);
	}
    )
    // Validators
    this.uploadForm = this.formBuilder.group({
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
		subscriberIds:new FormControl(''),
    });
  }

  onFileSelect(event) {
		if (event.target.files.length > 0) {
			this.fileChange=true;
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
		formData.append('fileName', this.uploadForm.get('fileName').value);
		formData.append('accessToken', this.uploadForm.get('accessToken').value);
		if(this.fileChange){
			formData.append('subscriberIds', this.uploadForm.get('subscriberIds').value);
		}
		this.service.updateFile(this.id,formData)
		.subscribe(
			res=>console.log(res)
		)
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
