import { Component, OnInit ,Inject } from '@angular/core';
import {MatDialog,  MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss']
})
export class PopupWindowComponent implements OnInit {

  constructor(public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data :any) { }

  ngOnInit() {
    console.log(this.data)
  }
  
}
