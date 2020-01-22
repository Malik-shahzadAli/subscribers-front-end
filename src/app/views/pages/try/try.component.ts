import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupWindowComponent } from '../popup-window/popup-window.component';

@Component({
  selector: 'kt-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss']
})
export class TryComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }
  openDialog(){
    this.dialog.open(PopupWindowComponent)
  }

}
