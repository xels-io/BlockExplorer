import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { GridService } from '../../Services/Grid.service';

@Component ({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.css']
})
export class BlockDetailsComponent implements OnInit, OnDestroy  {

  blockId: any;
  constructor(public gridService: GridService) {

  }
  // tslint:disable-next-line:use-life-cycle-interface

  ngOnInit() {

  }
  getVal(val) {
  }
  ngOnDestroy() {
  }

}
