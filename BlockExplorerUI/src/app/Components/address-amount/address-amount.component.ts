import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GridService } from 'src/app/Services/Grid.service';
@Component({
  selector: 'app-address-amount',
  templateUrl: './address-amount.component.html',
  styleUrls: ['./address-amount.component.css']
})
export class AddressAmountComponent implements OnInit {
  transactionDetails: any;
  page: any = {
    size:  0,
    pageNumber:  0,
    offset: 0,
    totalElements: 0
    };

    transDetail: any;
    blockDetails: any ;
  constructor(private service: GridService , private route: ActivatedRoute , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.transDetail = this.data.data;
    if(this.transDetail.vIn.length > 0 )
    {
     // console.log(this.transDetail.vIn);
    }

  }

}
