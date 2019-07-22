import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';

import {  Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';



@Component({
  selector: 'app-transactioncard',
  templateUrl: './transactioncard.component.html',
  styleUrls: ['./transactioncard.component.css']
})

export class TransactioncardComponent implements OnInit {
  cardData: any[] = [];
  InO: any ;
  dataIn: any;
  inputVal = false;
  outputVal = false;
  height: any;
  public buttonName: any = 'fa fa-plus';

  constructor(private service: GridService,  private router: Router, public dialog: MatDialog) {

   }
   /** initialization starts
  *
  *
  */
 ngOnInit() {
    if (this.service.blockData !== undefined) {
      this.height = this.service.blockData.height;
      this.dataIn = this.service.blockData;
      this.cardData = this.service.blockData['transactions'].map( (Retval) => {
        return {
          inputs: Retval.inputs,
          lockTime: this.service.timeFormat(Retval.lockTime) ,
          outputs: Retval.outputs,
          time: this.service.timeFormat(Retval.time), //1548407440,
          totalOut : Retval.totalOut,
          totalVOut:  this.toatalValCal(Retval.vOut),
          txId: Retval.txId,
          vIn: Retval.vIn,
          vOut: Retval.vOut
        };
      });
    }
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
   toatalValCal(voutVal) {
    let total = 0 ;
    voutVal.map( (val) => {
      total = (total + val.value) / 100000000;
    });
    return total ;
  }
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

  toggle(i) {
  }


}
