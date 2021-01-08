import { Component, OnInit , Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridService } from 'src/app/Services/Grid.service';
import { MAT_DIALOG_DATA} from '@angular/material';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})

export class TransactionDetailComponent implements OnInit {
  transDetail: any;
  blockDetails: any ;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar,private service: GridService , private route: ActivatedRoute , @Inject(MAT_DIALOG_DATA) public data: any ) {
  }

  ngOnInit() {
    this.blockDetails = (Array.isArray(this.service.blockData))?this.service.blockData[0]:this.service.blockData;

    this.transDetail = this.data.data;
    if (this.service.transaction !== undefined) {
       this.transDetail =  this.service.transaction;
    }
  }
  openSnackBar() {
    this._snackBar.open('Copied!!', '', {
      duration: 400,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  copySuccess(e){
    console.log(e);
    this.openSnackBar();
  }
}
