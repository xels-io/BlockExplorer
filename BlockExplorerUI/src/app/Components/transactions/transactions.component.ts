import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})


export class TransactionsComponent implements OnInit {
 transArray: any = [];
 rowTrans: any = [];
 temp: any = [];
 public TransactionColumns = [
  { name: 'Transaction Id' },
  { name: 'Inputs' },
  { name: 'Outputs' },
  { name: 'Time' }
];
  constructor(private  Service: GridService) { }

  ngOnInit() {
   this.transData();
  }

  transData() {
    if (this.Service.blockRowDataAll.length > 0 ) {
      const result = this.Service.blockRowDataAll.map(a => a.transactions);
      this.transArray = [].concat.apply([], result);
    }
    console.log(this.transArray);
    this.rowTrans = this.transArray.map((tmp) => {
      return {
        inputs: tmp.inputs,
        lockTime: this.Service.timeFormat(tmp.lockTime),
        outputs: tmp.outputs.split(" "),
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

    //console.log(this.rowTrans);
    this.temp = this.rowTrans
  }

  // Method displays the value according to search value
  onSearchChange(serVal: any) {
    const val: any  = serVal.toString().toLowerCase();
    // get the amount of columns in the table
     const datatoFind: any  = this.temp.filter((item: any) => {
      // loop through each object
      // tslint:disable-next-line:forin
      for (const key in item) {
        // tslint:disable-next-line:max-line-length
          if (item[key].toString().toLowerCase().indexOf(val) !== -1) {
            return item;
          }
         }
        });
        this.rowTrans = datatoFind;
       // this.table.offset = 0;
  }
}
