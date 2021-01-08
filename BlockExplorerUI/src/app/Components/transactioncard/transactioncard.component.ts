import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';

import {  Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactioncard',
  templateUrl: './transactioncard.component.html',
  styleUrls: ['./transactioncard.component.css']
})

export class TransactioncardComponent implements OnInit,OnChanges {

  cardData:Array<any> = [];
  blockData:Array<any> = [];
  @Input('blockid') blockid:String;
  InO: any ;
  //dataIn: any;
  inputVal = false;
  outputVal = false;
  toggle = [];
  public buttonName: any = 'fa fa-plus';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar,private service: GridService,  private router: Router, public dialog: MatDialog) {
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.service.getBlockInfo(this.blockid).subscribe(resp=>{
      let blockData = this.service.getMappedData([resp.InnerMsg])
      this.blockData = blockData[0];
      this.cardData = this.service.getTransactionDataMapped(this.blockData['transactions']);
    })
  }

  openSnackBar() {
    this._snackBar.open('Copied!!', '', {
      duration: 400,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

   handleCollaspe(i){
    this.toggle[i] = !this.toggle[i]
   }
   /** initialization starts
  *
  *
  */
  ngOnInit() {
    this.service.getBlockInfo(this.blockid).subscribe(resp=>{
      let blockData = this.service.getMappedData([resp.InnerMsg])
      this.blockData = blockData[0];
      this.cardData = this.service.getTransactionDataMapped(this.blockData['transactions']);
    })


    if (this.blockData !== undefined) {
      //this.height = this.blockData.height;
      //this.dataIn = this.blockData;
    }
  }

  // clip board success

  copySuccess(e){
    console.log(e);
    this.openSnackBar();
  }


  /** initialization ends
  *
  *
  */
  /**
   *  transaction details info starts
   *
   *
   */
   openTransactionDetail(item) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = item;
      const dialogRef = this.dialog.open(TransactionDetailComponent,
        {
          width: '1000px',
          data : dialogConfig
        });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    }
  /**
   *  transaction details info ends
   *
   *
   */
   /**
   *  Total value calculation starts
   *
   *
   */

 /**
   *  Total value calculation  ends
   *
   *
   */


  // onDetail(item: any) {
  //   //  console.log(item);
  //   this.service.transaction = Object.assign(item);
  //   this.router.navigate(['/transaction',   {transaction: item}]);
  // }


}
