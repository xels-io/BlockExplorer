import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';

import {MatDialog, MatDialogConfig } from '@angular/material';

import { AddressAmountComponent } from '../address-amount/address-amount.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})


export class TransactionsComponent implements OnInit {
  transactionArray: any = [];
  rowTrans: any = [];
  searchText: string;
  searchTransactionValue: any = [];
  transaction: any = [];
  transactionRows: any = [];
  dataFound = false;
  dataProcess = true;
  searchPage: any = {
  size:  0,
  pageNumber:  0,
  offset: 0,
  totalElements: 0
  };
  page: any = {
    size:  0,
    pageNumber:  0,
    offset: 0,
    totalElements: 0
  };
  transactionFound = false;
  transactionNotFound = false;
  
  public TransactionColumns = [
    { name: 'Transaction Id' },
    { name: 'Inputs' },
    { name: 'Outputs' },
    { name: 'Time' }
  ];
  public searchValue = '';
  constructor(private Service: GridService , public dialog: MatDialog,private route: ActivatedRoute,private router:Router) { }
  /** initialization starts
  *
  *
  */
  ngOnInit() {
    this.page.pageNumber = (this.route.queryParams['value'].page)?this.route.queryParams['value'].page:1;
    this.transactionPage({ offset: this.page.pageNumber-1 });
   // this.transData();
   // this.loadTransactionData(this.page.pageNumber);
  }
  /** initialization ends
  *
  *
  */
  /** get all transaction information starts
  *
  *
  */
  loadTransactionData (page) {
    this.transaction = this.Service.getTransactions(page,this.searchValue).subscribe((response: any) => {
      this.dataProcess = false;
      if (response.transactions.length > 0 ) {
        this.page.totalElements = response.transactionLength;
        this.dataFound = true;
        this.transactionData(response.transactions);
      }else{
        this.dataFound = false;
      }
    });
  }
  /** get all transaction information ends
  *
  *
  */

  /** mapping of transaction data starts
  *
  *
  */
   transactionData(transactionArray) {
    this.rowTrans = transactionArray.map((tmp) => {
      console.log(tmp)
      return {
        inputs: tmp.inputs,
        lockTime: this.Service.timeFormat(tmp.lockTime),
        outputs: tmp.outputs.slice(0, tmp.outputs.indexOf(' ')),
        time: this.Service.timeFormat(tmp.time),
        totalOut: (tmp.totalOut / 100000000),
        transactionId: tmp.txId,
        vIn: tmp.vIn,
        vOut: tmp.vOut.length ? (tmp.vOut.map((vout) => {
          return{
            address : vout.address,
            scriptPubKey : vout.scriptPubKey,
            value : (vout.value / 100000000)
          };
        })) : tmp.vOut,
        version: tmp.version
      };
    });
    if(this.rowTrans.length>0){
        this.dataFound = true;
    }
  }
  /** mapping of transaction data ends
  *
  *
  */
  /**
   * transactionPage is called whenever the user changes page starts
   *
   *
   *
   */
  transactionPage (pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.pageNumber = pageInfo.offset + 1;
    this.page.offset = pageInfo.offset;
    this.loadTransactionData(this.page.pageNumber);
    this.router.navigateByUrl('transactions?page='+this.page.pageNumber);
  }
  /**
   * transactionPage is called whenever the user changes page ends
   *
   *
   */
   /**
   * Method displays the value according to search input
   *
   *
   */
  searchTransactions(serVal: any) {
    let type = 'Transactions';
    this.searchValue = serVal;
    this.loadTransactionData (1);
  }
   /**
   * Method displays the value according to search input ends
   *
   *
   */

   /**
   *  Clear Serach Input value and load data starts
   *
   *
   */
  clearSerachVal() {
    if (this.searchText === '') {
      console.log('nothing');
    } else if (this.searchText !== '') {
      this.searchText = '';
      this.searchValue = '';
      this.loadTransactionData(1);
      
    }
  }
   /**
   *  Clear Serach Input value and load data ends
   *
   *
   */
  /**
   *  transaction address and their value info starts
   *
   *
   */
  openDialogAddress(item) {
     const dialogConfigTrans = new MatDialogConfig();
     dialogConfigTrans.data = item;
     const dialogRef = this.dialog.open(AddressAmountComponent,
       {
         width: '1000px',
         data : dialogConfigTrans
       });
     dialogRef.afterClosed().subscribe(result => {
       //console.log(`Dialog result: ${result}`);
     });
   }
  /**
   *  transaction address and their value info ends
   *
   *
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.transaction) {
      this.transaction.unsubscribe();
    }
  }
}
