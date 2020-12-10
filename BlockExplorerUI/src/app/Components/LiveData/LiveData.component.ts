import { Component,  OnInit  } from '@angular/core';
import { GridService } from '../../Services/Grid.service';
import { ActivatedRoute, Router } from '@angular/router';
import {interval} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component ({
  selector: 'app-live-data',
  templateUrl: './LiveData.component.html',
  styleUrls: ['./LiveData.component.css']
})
export class LiveDataComponent implements OnInit  {
  searchForm: FormGroup;
  searchText: string;
  addTaskValue = '';
  selctedRow: any = false;
    rows = [];
    selected = [];
    subs: any;
    restBlocks: any;
    cols = [];
    searchFound = false;
    notFound = false;
    dataFound = false;
    dataProcess = true;
    socketData: any;
    lastHeight: any ;
    searchVal: any = [] ;
    public BlockGridColumns = [
      { name: 'Block Id' },
      { name: 'Height' },
      { name: 'Block Time' },
      { name: 'Transaction Count' },
      { name: 'Total Amount' },
      { name: 'Confirmations' },
      { name: 'Block Reward' }
    ];
    data = 'GetLastNBlockInfo';
    page: any = {
      size:  0,
      pageNumber:  1,
      offset: 0,
      totalElements: 0
    };
    searchPage: any = {
      size:  0,
      pageNumber:  0,
      offset: 0,
      totalElements: 0
    };

  constructor( private  gridService: GridService, private route: ActivatedRoute, private router: Router , ) {
    this.cols = this.BlockGridColumns;
    this.dataFound = true;
  }


   /** initialization starts
    *
    *
    */
  ngOnInit() {
    this.page.pageNumber = (this.route.queryParams['value'].page)?this.route.queryParams['value'].page:1;
    this.pageCallback({ offset: this.page.pageNumber-1 });
    interval(150000).subscribe(() => {
      this.getRestBlockData(this.lastHeight);
      }
    );
  }
  /** initialization ends
    *
    *
    */

  /**  get rest of blocks created later starts
  *
  *
  */
  getRestBlockData(height) {
    if (height !== undefined) {
      this.restBlocks = this.gridService.getRestNBlocks(height).subscribe((restResponse: any) => {
        this.dataProcess = false;
        if (restResponse.InnerMsg.length > 0) {
          this.lastHeight = restResponse.InnerMsg[0].height;
          const m: any[] = this.gridService.getMappedData(restResponse.InnerMsg);
          const mergeSearch = m.concat(this.rows);
          const result = m.concat(this.rows);
          this.rows = result;
        }
      });
    }
  }
  /** get rest of blocks created later ends
  *
  *
  */
  /** get all created blocks information starts
  *
  *
  */
  getBlockExplorerTableData(page) {
    this.subs = this.gridService.getAllPagesBlocks(page).subscribe((response: any) => {
   // console.log(response.blocksArray[0].height);
      this.dataProcess = false;
      if (response.blocksArray.length > 0) {
        this.page.totalElements = response.totalLength;
        this.dataFound = true;
        this.lastHeight = response.blocksArray[0].height;
       // this.gridService.blockRowDataAll = response.InnerMsg;
        this.rows = this.gridService.getMappedData(response.blocksArray);
       // this.gridService.blockRowDataAll = this.rows;
      }
    });
  }
  /** get all created blocks information ends
  *
  *
  */

   /**
   * Called whenever the user changes page starts
   *
   *
   */
   pageCallback(pageInfo) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.page.offset = pageInfo.offset;
    this.getBlockExplorerTableData(this.page.pageNumber);
    this.router.navigateByUrl('?page='+this.page.pageNumber);
  }
  /**
   * Called whenever the user changes page ends
   *
   *
   */
   /**
   * show details of block data table starts
   *
   *
   */

   //blockId = block Hash
  blockDetails(blockId) {
    //this.gridService.blockData = height;
    this.router.navigate(['/blocks', blockId]);
    }
   /**
   * show details of block data table ends
   *
   *
   */
  /**
   * total calculation of blocks totalOut starts
   *
   *
   */
  totalCalculation (vOut) {
    let total = 0;
      if (vOut.length > 1 ) {
        vOut.shift();
        vOut.map((val) => {
          if (!val.cStake) {
            total = total + val.value;
            return total;
          }
        });
      } else {
          total =  vOut[0].value;
          return total;
        }

  }
  /**
   * total calculation of blocks totalOut ends
   *
   *
   */
   /**
   * Method displays the value according to search input
   *
   *
   */
  searchOutput(serVal: any) {
    const type = 'Blocks';
    const val: any  = serVal.toString().toLowerCase();
    this.searchVal = this.gridService.searchRows(serVal, type).subscribe((response: any) => {
      this.dataProcess = false;
      if (response.statusCode === 200 ) {
          this.notFound = false;
          this.dataFound = false;
          this.searchFound = true;
          this.rows = response.InnerMsg;
         // this.searchPage.totalElements = response.InnerMsg.length;
        } else {
          this.notFound = true;
          this.dataFound = false;
          this.searchFound = false;
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
     // console.log('search');
      this.page.pageNumber = 1;
      this.searchText = '';
      this.getBlockExplorerTableData(this.page.pageNumber);
      this.dataFound = true;
      this.searchFound = false;
      this.notFound = false;
    }
  }
  /**
   *  Clear Serach Input value and load data ends
   *
   *
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    if (this.restBlocks) {
      this.restBlocks.unsubscribe();
    }
  }

}
