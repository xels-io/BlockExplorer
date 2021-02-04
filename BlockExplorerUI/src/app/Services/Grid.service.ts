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
  public timeTransform = moment;
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
    proofOfStakeReward: 50,
    proofOfWorkReward: 50,
    firstMiningPeriodHeight: 768000,
    secondMiningPeriodHeight: 768000 + 768000,
    thirdMiningPeriodHeight: 768000 + 768000 + 768000,
    forthMiningPeriodHeight: 768000 + 768000 + 768000 + 768000,
    fifthMiningPeriodHeight: 768000 + 768000 + 768000 + 768000 + 768000
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
    const prm: any = new HttpParams().set('URL', '/api/BlockStore/getallblocksfromheight').set('height', params);
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
   // blockid = block hash
   getBlockInfo(blockid): Observable<any> {
    const prm: any = new HttpParams().set('URL', '/api/BlockStore/block').set('Hash', blockid).set('showTransactionDetails','true').set('OutputJson','true');
    return this.http.get<any>(this.baseApiUrl + '/GetAPIResponse', {params: prm});
  }

   //   Get single block info
   getBlockInfoByHeight(height): Observable<any> {
    const perpage: any = 10;
    return this.http.get<any>(this.baseApiUrl + '/getBlockByHeight?height=' + height);
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
    let dateString = moment(currentDate).format("DD-MM-YYYY HH:mm:ss");
    return dateString;
  }
  standardFormat (datetime) {
    const currentDate = new Date(datetime * 1000);
    let dateString = moment.utc(currentDate).format("YYYY-MM-DD HH:mm:ss");
    return dateString;
  }

  /** format time ends
  *
  *
  */

  // public GetProofOfStakeReward( height) {
  //  if (height === 0) {
  //       this.rewardCal = 0;
  //       return this.rewardCal;
  //    } else if (height <= this.consensus.premineHeight) {
  //       //this.rewardCal = 187155000; old
  //       this.rewardCal = this.consensus.premineHeight;
  //       return this.rewardCal;
  //   } else if (height <= this.consensus.firstMiningPeriodHeight) {
  //       this.rewardCal = this.consensus.proofOfStakeReward;
  //       return this.rewardCal;
  //   } else if (height <= this.consensus.secondMiningPeriodHeight) {
  //       this.rewardCal = this.consensus.GetProofOfStakeReward - ((3256) * (height - this.consensus.firstMiningPeriodHeight));
  //       return this.rewardCal;
  //   } else if (height <= this.consensus.ThirdMiningPeriodHeight) {
  //       this.rewardCal = this.consensus.ProofOfStakeReward / 2;
  //       return this.rewardCal;
  //   } else if (height <= this.consensus.ForthMiningPeriodHeight){
  //       return (this.consensus.ProofOfStakeReward / 2) - ((1628) * (height - this.consensus.ThirdMiningPeriodHeight));
  //   }
  //    else if (height <= this.consensus.firstMiningPeriodHeight) {
  //       this.rewardCal = (this.consensus.ProofOfStakeReward / 4)
  //       return this.rewardCal;
  //   } else {
  //       let multiplier = (height-this.consensus.FifthMiningPeriodHeight)/210240;
  //       let returnAmount = 1449770000;
  //       if (multiplier == 0)
  //       {
  //           return 1449770000;
  //       }
  //       else
  //       {
  //           for (let i = 0; i < multiplier; i++)
  //           {
  //               returnAmount *= 1.02;
  //           }
  //       }
  //       this.rewardCal = returnAmount;

  //       return this.rewardCal;
  //   }
  // }
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
    //this.GetProofOfStakeReward(blockRowDataAll[0].height);
      let blockData = blockRowDataAll.map((tmp) => {
        let totalA = this.getAmount(tmp.transactions) ;
        let blockTime = this.timeFormat(tmp.time);
        let stFormatTime = this.standardFormat(tmp.time);
        let timeAgo = moment(stFormatTime+ 'Z').fromNow();

      if (tmp.transactions.length > 1) {
        this.rewardCal = (tmp.blockReward / 100000000 );
        //  tmp.transactions.splice(1, 1);
        return {
          ...tmp,
          blockId: tmp.hash,
          transactions: tmp.transactions,
          tx: tmp.tx,
          blockTime: blockTime,
          timeAgo:timeAgo,
          blockReward: (tmp.blockreward / 100000000 ),
          height: tmp.height,

          confirmations: tmp.confirmations,
          transactionCount: tmp.nTx,
          //  transactions: this.getTransVal(tmp.transactions),

          totalAmount: totalA,
        };
      } else {
        return {
          ...tmp,
          blockId: tmp.hash,
          blockReward: (tmp.blockreward / 100000000 ),
          blockTime: this.timeFormat(tmp.time),
          timeAgo:timeAgo,
          height: tmp.height,
          totalAmount: totalA,
          confirmations: tmp.confirmations,
          transactionCount: tmp.nTx,
          transactions: tmp.transactions
          //  transactions: this.getTransVal(tmp.transactions)
        };
      }
    });
    this.blockData = blockData;
    return blockData;
 }
  /** mapping block data table ends
  *
  *
  */

  /**
   * TotalAmount data calculation starts from transaction amount
  */
 getAmount(transactions) {

  // const y: any [] = this.getTransVal(transaction);
  let y = transactions.slice();
  let total = 0;

  y.map((tmpTotal) => {
    tmpTotal.vout.map((val) => {
      total = total + val.value;
    });
  });
  return total;
  }
 /** TotalAmount data calculation ends
  *
  *
  */


 toatalValCal(voutVal) {
    let total = 0 ;
    voutVal.map( (val) => {
      //total = (total + val.value) / 100000000;
      total = (total + val.value);
    });
    return total ;
  }

  getTransactionDataMapped(transactions){
    let mapped =  transactions.map( (Retval) => {
      return {
        inputs: Retval.inputs,
        lockTime: this.timeFormat(Retval.lockTime) ,
        outputs: Retval.outputs,
        time: this.timeFormat(Retval.time), //1548407440,
        totalVOut:  this.toatalValCal(Retval.vout),
        txId: Retval.txid,
        vIn: Retval.vin,
        vOut: Retval.vout
      };
    });

    return mapped;


  }

}
