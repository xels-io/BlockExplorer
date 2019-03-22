import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-address-grid',
  templateUrl: './AddressGrid.component.html',
  styleUrls: ['./AddressGrid.component.css']
})
export class AddressGridComponent implements OnInit {
@Input() transactionInfo: any[];
  constructor() { }

  ngOnInit() {
  }

}
