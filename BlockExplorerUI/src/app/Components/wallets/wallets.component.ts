import { Component, OnInit , Input, EventEmitter, Output, ViewChild} from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  @ViewChild(DatatableComponent) richlist: DatatableComponent;
  rows = [];
  temp: any[] = [];
  subs: any;
  cols = [];


  constructor(private  gridService: GridService) { }

  ngOnInit() {
    this.getRichData();
  }
  getRichData() {
    this.subs = this.gridService.getLastNBlocks(10).subscribe((response: any) => {

      this.gridService.blockRowDataAll = response.InnerMsg;
      this.temp = this.gridService.blockRowDataAll;
      this.rows = this.temp;

    });
  }
}
