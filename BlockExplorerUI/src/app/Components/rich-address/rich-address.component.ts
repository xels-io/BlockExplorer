import { Component, OnInit } from '@angular/core';
import { GridService } from '../../Services/Grid.service';
@Component({
  selector: 'app-rich-address',
  templateUrl: './rich-address.component.html',
  styleUrls: ['./rich-address.component.css']
})
export class RichAddressComponent implements OnInit {
  page: any = {
    size:  0,
    pageNumber:  0,
    offset: 0,
    totalElements: 0
  };
  searchPage: any = {
    size:  0,
    pageNumber:  0,
    offset: 0,
    totalElements: 0
  };

  public RichListColumns = [
    { name: 'Address' },
    { name: 'Amount' }
  ];
  subs: any;
  richList: any = [];
  searchVal: any = [] ;
  listFound = false;
  listnotFound = false;
  allAddress = true;
  searchText: string;
  constructor(private  gridService: GridService) { }

  ngOnInit() {
    this.richListPageCall({ offset: 0 });

  }
  getRichListAddress(page) {
    this.subs = this.gridService.getAllRichAddressList(page).subscribe((response: any) => {

      if (response.totalLength > 0) {
        this.page.totalElements = response.totalLength;
        this.allAddress = true;
        this.richList = response.richList;
        console.log(this.richList);
      }
    });
  }
 /**
   * Called whenever the user changes page starts
   *
   *
   */
  richListPageCall(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.getRichListAddress(this.page.pageNumber);
  }
  /**
   * Called whenever the user changes page ends
   *
   *
   */

  /**
   * Method displays the value according to search input
   *
   *
   */
  searchAddress(serVal: any) {
    const type = 'RichAddress';
    const val: any  = serVal.toString().toLowerCase();
    this.searchVal = this.gridService.searchRows(serVal, type).subscribe((response: any) => {

      if (response.statusCode === 200 ) {
          this.listnotFound = false;
          this.allAddress = false;
          this.listFound = true;
          this.richList = response.InnerMsg;
          this.page.totalElements = response.InnerMsg.length;
        } else {
          this.listnotFound = true;
          this.allAddress = false;
          this.listFound = false;
          this.page.totalElements = 0;
          this.richList = response.InnerMsg;
        }
    });
  }
  /**
   *  Clear Serach Input value and load data starts
   *
   *
   */
  clearSerachVal() {
    if (this.searchText === '') {
      console.log('nothing');
    } else if (this.searchText !== '') {
      this.page.pageNumber = 1;
      this.searchText = '';
      this.getRichListAddress(this.page.pageNumber);
      this.allAddress = true;
      this.listFound = false;
      this.listnotFound = false;
    }
  }
/**
   *  Clear Serach Input value and load data ends
   *
   *
   */

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
