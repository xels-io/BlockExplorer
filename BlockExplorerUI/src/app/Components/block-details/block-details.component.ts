import { Component, OnInit, OnDestroy} from '@angular/core';
import { GridService } from '../../Services/Grid.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component ({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.css']
})
export class BlockDetailsComponent implements OnInit, OnDestroy  {

  height: any;
  blockData: any;
  transactionData: any;
  constructor(public gridService: GridService,private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.height = this.route.params['value'].height;
    this.gridService.getBlockInfo(this.height).subscribe(resp=>{
      this.blockData = resp.InnerMsg;

      this.transactionData = this.blockData['transactions'].map( (Retval) => {
        return {
          inputs: Retval.inputs,
          lockTime: this.gridService.timeFormat(Retval.lockTime) ,
          outputs: Retval.outputs,
          time: this.gridService.timeFormat(Retval.time), //1548407440,
          totalOut : Retval.totalOut,
          totalVOut:  this.toatalValCal(Retval.vOut),
          txId: Retval.txId,
          vIn: Retval.vIn,
          vOut: Retval.vOut
        };
      });

      console.log('From BlockDetailsComponent',resp.InnerMsg);
    })
  }
  toatalValCal(voutVal) {
    let total = 0 ;
    voutVal.map( (val) => {
      total = (total + val.value) / 100000000;
    });
    return total ;
  }
  getVal(val) {
  }
  ngOnDestroy() {
  }

}
