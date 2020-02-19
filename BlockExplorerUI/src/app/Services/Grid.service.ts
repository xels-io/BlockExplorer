import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders , HttpParams   } from '@angular/common/http';
import { Observable,  Subject, BehaviorSubject, } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class GridService {
  public blockRowDataAll: any[];
  public blockRowData: any[];
  public transactionDetailsRow: any[];
  public blockData: any;
  
  public baseApiUrl = environment.baseUrl;
  observer: any;
  public handle = new Subject ();
  block: any = [];
  mapData: any[] = [];
  private msg = new BehaviorSubject<any>('defaily');
  public currentmsg = this.msg.asObservable();
  public socket;
  public transaction: any ;
  rewardCal: any = 0;
  public consensus: any = {
    premineHeight: 10,
    premineReward: 187155000,
    proofOfStakeReward: 375,
    firstMiningPeriodHeight: 850000,
    secondMiningPeriodHeight: 850000 + 500000,
    thirdMiningPeriodHeight: 850000 + 500000 + 850000,
    forthMiningPeriodHeight: 850000 + 500000 + 850000 + 500000
  };
  constructor(private http: HttpClient) {
    this.socket = socketIo(this.baseApiUrl);
   }
  // public getSocketData(): Observable <any> {
  //   console.log('socket from grid service');
  //   this.socket.on('data', (res) => {
  //     // tslint:disable-next-line:whitespace
  //     if(res !== null) {
  //       this.observer.next(res);
  //        return res;
  //     }
  //   });
  //   return this.createObservable();
  // }

  // createObservable(): Observable<number> {
  //   return new Observable(observer => {
  //     this.observer = observer;
  //   });
  // }
  /** Get all api responses starts
  *
  *
  */
 public getResults(page: any): Observable<any> {
       const prm: any = new HttpParams()
       .set('URL', '/api/BlockExplorer/GetLastNBlockInfo')
       .set('numberOfBlocks', page.blocks)
       .set('pageNumber', page.pageNo)
       .set('pageSize', page.pageSize);
    return this.http.get<any>(this.baseApiUrl + '/GetAPIResponse', {params: prm});
    }

  /** Get all api responses ends
  *
  *
  */
  /** Get Search Values starts
  *
  *
  */
  public searchRows(val: any, type: any): Observable<any> {

    const prm: any = new HttpParams()
    .set('value', val)
    .set('types', type);
    return this.http.get<any>(this.baseApiUrl + '/getSearchVal' , {params: prm});
  }
  /** Get Search Values ends
  *
  *
  */
  // ......API calls Starts here ......
  // Get all blocks
  public getAllBlocks() {
    return this.http.get<any>(this.baseApiUrl + '/getAllBlock');
  }
  /** Get 10 blocks per page starts
  *
  *
  */
  public getAllPagesBlocks(page: any ): Observable<any> {
    const perpage: any = 10;
    const prm: any = new HttpParams().set('page', page).set('perPage', perpage);

    return this.http.get<any>(this.baseApiUrl + '/getAllBlocksParams/page=' + page + '/perPage=' + perpage);
  }
  /** Get 10 blocks per page ends
  *
  *
  */
 /** Get 10 transactions per page starts
  *
  *
  */
 public getTransactions(page: any,searchValue: string ): Observable<any> {
  const perpage: any = 10;
  const prm: any = new HttpParams().set('page', page).set('perPage', perpage);

  return this.http.get<any>(this.baseApiUrl + '/getTransactions/page=' + page + '/perPage=' + perpage+'?search='+searchValue);
}
/** Get 10 transactions per page ends
*
*
*/
  /** Get 10 rich address list per page starts
  *
  *
  */
 public getAllRichAddressList(page: any ): Observable<any> {
  const perpage: any = 10;
  const prm: any = new HttpParams().set('page', page).set('perPage', perpage);
  return this.http.get<any>(this.baseApiUrl + '/address/page=' + page + '/perPage=' + perpage);
  }
  /** Get 10 rich address list per page ends
  *
  *
  */
  /** Get rest new blocks starts
  *
  *
  */
  getRestNBlocks(params: any): Observable<any> {
    // console.log('param');
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/RestblockAppend').set('height', params);
    return this.http.get<any>(this.baseApiUrl + '/RestBlock', {params: prm});
  }
  /** Get rest new blocks ends
  *
  *
  */
  //   Get last number of blocks
  getLastNBlocks(params: any): Observable<any> {
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/GetLastNBlockInfo').set('numberOfBlocks', params);
    return this.http.get<any>(this.baseApiUrl + '/GetAPIResponse', {params: prm});
  }

   //   Get single block info
   getBlockInfo(height): Observable<any> {
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/GetBlockInfo').set('height', height);
    return this.http.get<any>(this.baseApiUrl + '/GetAPIResponse', {params: prm});
  }


 /** Post Api call starts
  *
  *
  */
  postMessage(msg: any): Observable<any> {
    const user: any = { id : 1, name : 'Hello'};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseApiUrl + '/PostAPIResponse', user, {headers: headers} );
  }
  /** Post Api call ends
  *
  *
  */
  // ......API calls Ends here ......

  // .....common Methods Start Here.....
  // format time starts

  timeFormat (time) {
    const currentDate = new Date(time * 1000);
    let dateString = moment.utc(currentDate).format("DD-MM-YYYY HH:mm:ss");
    return dateString;
  }
  /** format time ends
  *
  *
  */

  public GetProofOfStakeReward( height) {
   if (height === 0) {
        this.rewardCal = 0;
        return this.rewardCal;
     } else if (height <= this.consensus.premineHeight) {
        this.rewardCal = 187155000;
        return this.rewardCal;
    } else if (height <= this.consensus.firstMiningPeriodHeight) {
        this.rewardCal = this.consensus.proofOfStakeReward;
        return this.rewardCal;
    } else if (height <= this.consensus.secondMiningPeriodHeight) {
        this.rewardCal = this.consensus.GetProofOfStakeReward - ((37500) * (height - this.consensus.firstMiningPeriodHeight));
        return this.rewardCal;
    } else if (height <= this.consensus.ThirdMiningPeriodHeight) {
        this.rewardCal = this.consensus.ProofOfStakeReward / 2;
        return this.rewardCal;
    } else if (height <= this.consensus.firstMiningPeriodHeight) {
        this.rewardCal = (this.consensus.ProofOfStakeReward / 2) - ((37500) * (height - this.consensus.thirdMiningPeriodHeight));
        return this.rewardCal;
    } else {
        return this.rewardCal;
    }
  }
  getTransVal(transactions) {
    if (transactions.length > 0 ) {
      transactions[0].vOut[0].value = this.rewardCal * 100000000;
      return transactions;
    }
  }
  // mapping data

  /** mapping block data table starts
  *
  *
  */
  getMappedData(blockRowDataAll) {
    this.GetProofOfStakeReward(blockRowDataAll[0].height);
    this.mapData = blockRowDataAll.map((tmp) => {
    if (tmp.transactions.length > 1) {
      //  tmp.transactions.splice(1, 1);
      // totalA = this.getAmount(tmp.transactions) ;
     return {
       blockId: tmp.blockId,
      // blockReward: tmp.blockReward / 100000000,
       blockTime: this.timeFormat(tmp.blockTime),
       blockReward: this.GetProofOfStakeReward(tmp.height),
       height: tmp.height,

       confirmations: tmp.confirmations,
       transactionCount: tmp.transactionCount,
       transactions: this.getTransVal(tmp.transactions),
       totalAmount: this.getAmount(tmp.transactions) / 100000000,
     };
     } else {

       return {
         blockId: tmp.blockId,
         blockReward: this.GetProofOfStakeReward(tmp.height),
         blockTime: this.timeFormat(tmp.blockTime),
         height: tmp.height,
         totalAmount: (tmp.totalAmount / 100000000 ),
         confirmations: tmp.confirmations,
         transactionCount: tmp.transactionCount,
         transactions: this.getTransVal(tmp.transactions)
       };
     }
 });
   return this.mapData;
 }
  /** mapping block data table ends
  *
  *
  */

  /** TotalAmount data calculation starts
  *
  *
  */
 getAmount(transaction) {
  const y: any [] = this.getTransVal(transaction);
  let total = 0;
  if (y.length > 1) {
    y.splice(1, 1);
  }
  y.map((tmpTotal) => {
    if (tmpTotal.vOut.length > 1 ) {
      tmpTotal.vOut.shift();
    }
    tmpTotal.vOut.map((val) => {
      if (!val.cStake) {
        total = total + val.value;
      }
    });
  });
    return total;
  }
 /** TotalAmount data calculation ends
  *
  *
  */

}
