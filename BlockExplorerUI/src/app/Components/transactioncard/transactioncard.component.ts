import { Component, OnInit, Input } from '@angular/core';
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

  @Input() blockData;
  @Input() cardData;
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

    if (this.blockData !== undefined) {
      this.height = this.blockData.height;
      this.dataIn = this.blockData;
      
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
