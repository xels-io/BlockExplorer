import { Component, OnInit , OnDestroy, Input} from '@angular/core';
import { Subscription  } from 'rxjs/Subscription';
import { GridService } from '../../Services/Grid.service';

import {MatDialog} from '@angular/material';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-blockpage',
  templateUrl: './blockpage.component.html',
  styleUrls: ['./blockpage.component.css']
})
export class BlockpageComponent implements OnInit {

  @Input() tableData;
  no = false;
  show_more = false;
   subscription: Subscription;
  constructor(public gridService: GridService) {
  }
  getDataBlock() {

  }
  ngOnInit() {
  }
  block(height){
    this.gridService.getBlockInfoByHeight(height).subscribe(resp=>{
      let block = resp.InnerMsg;
      if(block.length>0){
        let hash = block[0].hash;
        window.location.href = '/blocks/'+hash;
      }else{
        this.no = true;
      }
    })
  }
  showMoreBlockInfo(){
    this.show_more = !this.show_more;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {

    }
}
