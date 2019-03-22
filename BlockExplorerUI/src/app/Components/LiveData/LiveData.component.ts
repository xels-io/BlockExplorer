import { Component,  OnInit, ViewChild  } from '@angular/core';
import { GridService } from '../../Services/Grid.service';
// import { Observable, of } from 'rxjs';
// import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
// import { ViewCompileResult } from '@angular/compiler/src/view_compiler/view_compiler';
import {interval} from 'rxjs';
@Component ({
  selector: 'app-live-data',
  templateUrl: './LiveData.component.html',
  styleUrls: ['./LiveData.component.css']
})
export class LiveDataComponent implements OnInit  {
  selctedRow: any = false;
 // @ViewChild(DatatableComponent) table: DatatableComponent;

    rows = [];
    selected = [];
    temp: any[] = [];
    subs: any;
    restBlocks: any;
    cols = [];
    socketData: any;
    lastHeight: any ;
    public BlockGridColumns = [
      { name: 'Block Id' },
      { name: 'Height' },
      { name: 'Block Time' },
      { name: 'Transaction Count' },
      { name: 'Total Amount' },
      { name: 'Confirmations' },
      { name: 'BlockReward' }
    ];
    data = 'GetLastNBlockInfo';
  constructor( private  gridService: GridService, private route: ActivatedRoute, private router: Router) {
    this.cols = this.BlockGridColumns;
  }
  ngOnInit() {
   // this.getBlockWithHeight();
   // this.gridService.postMessage(this.data);
    setTimeout(this.getTableData.bind(this), 50);

    interval(150000).subscribe(() => {
      // console.log(this.lastHeight);
      this.getRestData(this.lastHeight);
    }
    );
  }

  getRestData(height) {
    if (height !== undefined) {
      this.restBlocks = this.gridService.getRestNBlocks(height).subscribe((restResponse: any) => {
        if (restResponse.InnerMsg.length > 0) {
          const m: any[] = this.gridService.getMappedData(restResponse.InnerMsg);
          const result = m.concat(this.gridService.blockRowDataAll);
          this.rows = result;
          this.gridService.blockRowDataAll = this.rows;
          this.temp = this.rows;
        }
      });

    }
  }
  getTableData() {
    this.subs = this.gridService.getAllBlocks().subscribe((response: any) => {
      if (response.InnerMsg.length > 0) {
        this.lastHeight = response.InnerMsg[0].height;
        this.gridService.blockRowDataAll = response.InnerMsg;
        this.rows = this.gridService.getMappedData(this.gridService.blockRowDataAll);
        this.gridService.blockRowDataAll = this.rows;
      }
      this.temp = this.rows;
    });
  }
  // onclick height of block live data table leads to details
  onClick(searchTerm: any) {
    this.gridService.blockData = searchTerm;
    this.router.navigate(['/blocks', searchTerm.height]);
    }
// OnSelect method shows the selected transaction row in details
  onSelect( {selected, rowP }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    if (selected[0].transactions.length ) {
      this.selctedRow = true;
      this.gridService.transactionDetailsRow = selected[0].transactions.map((tmp) => {
        return {
          inputs: tmp.inputs,
          lockTime: this.gridService.timeFormat(tmp.lockTime),
          outputs: tmp.outputs,
          time: this.gridService.timeFormat(tmp.time),
          totalOut: this.totalOut(tmp.vOut) / 100000000,
          txId: tmp.txId,
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
  }
  totalOut (vOut)
  {
    let total = 0;
      if (vOut.length > 1 ) {
        vOut.shift();
        vOut.map((val) => {
          if (!val.cStake) {
            total = total + val.value;
            return total;
          }
        });
      }
      else
        {
          total =  vOut[0].value;
          return total;
        }

  }
  onActivate(event) {
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
        this.rows = datatoFind;
       // this.table.offset = 0;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    if (this.socketData) {
      this.socketData.unsubscribe(); }
    if (this.restBlocks) {
      this.restBlocks.unsubscribe();
    }
  }
// socket connection for live update
  // getBlockWithHeight() {
  //   this.socketData = this.gridService.getSocketData().subscribe(response => {
  //      tslint:disable-next-line:max-line-length
  //     if (this.gridService.blockRowDataAll && this.gridService.blockRowDataAll.length > 0) {
  //       this.gridService.blockRowDataAll.unshift(response);
  //       this.gridService.blockRowDataAll.pop();
  //       this.gridService.blockRowDataAll = [...this.gridService.blockRowDataAll];
  //       this.rows = this.gridService.blockRowDataAll;
  //     }
  //   });
  // }


}
