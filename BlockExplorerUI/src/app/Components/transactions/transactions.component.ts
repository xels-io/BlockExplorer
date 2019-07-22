import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';

import {MatDialog, MatDialogConfig } from '@angular/material';

import { AddressAmountComponent } from '../address-amount/address-amount.component';
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
  allTransactionsFound = false;
  public TransactionColumns = [
    { name: 'Transaction Id' },
    { name: 'Inputs' },
    { name: 'Outputs' },
    { name: 'Time' }
  ];
  constructor(private Service: GridService , public dialog: MatDialog) { }
  /** initialization starts
  *
  *
  */
  ngOnInit() {
    this.transactionPage({ offset: 0 });
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
    this.transaction = this.Service.getAllPagesBlocks(page).subscribe((response: any) => {
      if (response.blocksArray.length > 0 ) {
        this.page.totalElements = response.transactionLength;
        this.allTransactionsFound = true;
        this.transactionData(response.blocksArray );
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
   transactionData(blockRowDataAll) {
    if (blockRowDataAll.length > 0 ) {
      const result = blockRowDataAll.map(a => a.transactions);
      this.transactionArray = [].concat.apply([], result);
    }
    this.rowTrans = this.transactionArray.map((tmp) => {
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
    this.loadTransactionData(this.page.pageNumber);
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
    const val: any  = serVal.toString().toLowerCase();
    this.searchTransactionValue = this.Service.searchRows(serVal, type).subscribe((response: any) => {
      if (response.statusCode === 200 ) {
          this.transactionNotFound = false;
          this.allTransactionsFound = false;
          this.transactionFound = true;
          this.rowTrans = response.InnerMsg;
         // this.searchPage.totalElements = response.InnerMsg.length;
        } else {
          this.transactionNotFound = true;
          this.allTransactionsFound = false;
          this.transactionFound = false;
        }
    });
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
      this.page.pageNumber = 1;
      this.loadTransactionData(this.page.pageNumber);
      this.allTransactionsFound = true;
      this.transactionFound = false;
      this.transactionNotFound = false;
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
