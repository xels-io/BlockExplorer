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
  blockid: any;
  blockData: any;
  constructor(public gridService: GridService,private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.blockid = this.route.params['value'].blockid;
    this.gridService.getBlockInfo(this.blockid).subscribe(resp=>{
      let blockData = this.gridService.getMappedData([resp.InnerMsg]);
      this.blockData = blockData[0];
    })
  }
  
  getVal(val) {
  }
  ngOnDestroy() {
  }

}
