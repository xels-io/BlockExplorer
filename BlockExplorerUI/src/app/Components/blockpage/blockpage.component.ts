import { Component, OnInit , OnDestroy, Input} from '@angular/core';
import { Subscription  } from 'rxjs/Subscription';
import { GridService } from '../../Services/Grid.service';
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-blockpage',
  templateUrl: './blockpage.component.html',
  styleUrls: ['./blockpage.component.css']
})
export class BlockpageComponent implements OnInit {

  @Input() tableData;
  no = false;

   subscription: Subscription;
  ngxSpinnerTimeout: any;
  constructor(private router:Router,private spinner:NgxSpinnerService,public gridService: GridService) {
  }
  getDataBlock() {

  }
  ngOnInit() {
    this.spinner.show('pageInit');
    this.ngxSpinnerTimeout=setTimeout(() => {
      this.spinner.hide("pageInit");
    }, 650);
  }
  block(height){
    this.spinner.show("pageChange");
    this.gridService.getBlockInfoByHeight(height).subscribe(resp=>{
      this.no=false;
      this.spinner.hide("pageChange");
      let block = resp.InnerMsg;
      if(block.length>0){
        let hash = block[0].hash;
        // window.location.href = '/blocks/'+hash;
        this.router.navigate(['blocks',hash]);
      }else{
        this.no = true;
      }
    })
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    clearTimeout(this.ngxSpinnerTimeout);
    }
}
