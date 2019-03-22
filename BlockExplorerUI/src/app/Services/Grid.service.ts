import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders , HttpParams   } from '@angular/common/http';
import { Observable,  Subject, BehaviorSubject, } from 'rxjs';
// import 'rxjs/add/operator/catch';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable()
export class GridService {
  public blockRowDataAll: any[];
  public blockRowData: any[];
  public selectedBlockData: any[];
  public transactionDetailsRow: any[];
  public blockData: any;
  public baseApiUrl = environment.baseUrl;
  observer: any;
  public handle = new Subject ();
  public dataStringSource = new Subject<string>();
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
  public getSocketData(): Observable <any> {

    this.socket.on('data', (res) => {
      // tslint:disable-next-line:whitespace
      if(res !== null) {
        this.observer.next(res);
         return res;
      }
    });
    return this.createObservable();
  }

  createObservable(): Observable<number> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }


  // ......API calls Starts here ......
  // Get all blocks
  public getAllBlocks() {
    return this.http.get<any>(this.baseApiUrl + '/getAllBlock');
  }
  //   Get rest new blocks
  getRestNBlocks(params: any): Observable<any> {
    // console.log('param');
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/RestblockAppend').set('height', params);
    return this.http.get<any>(this.baseApiUrl + '/RestBlock', {params: prm});
  }
  //   Get last number of blocks
  getLastNBlocks(params: any): Observable<any> {
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/GetLastNBlockInfo').set('numberOfBlocks', params);
    return this.http.get<any>(this.baseApiUrl + '/GetAPIResponse', {params: prm});
  }
  // Post Api call
  postMessage(msg: any): Observable<any> {
    const user: any = { id : 1, name : 'Hello'};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const prm: any = new HttpParams().set('URL', '/api/BlockExplorer/PostMessage').set('msg', msg);
    return this.http.post<any>(this.baseApiUrl + '/PostAPIResponse', user, {headers: headers} );
  }
  // getBlockByHeight() {
  //   return this.http.get(this.baseApiUrl + '/api/blocks');
  // }
  // ......API calls Ends here ......
  public insertData(data: any) {
    this.handle.next(data);
  }
  getData(): Observable<any> {
     return this.handle.asObservable();
  }
  changeMessage(message: string) {
    this.msg.next(message);
  }
  // .....common Methods Start Here.....
  // format time

  timeFormat (time) {
    const currentDate = new Date(time * 1000);
    const date = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
    // tslint:disable-next-line:max-line-length
    const month = (currentDate.getMonth() + 1) < 9 ? '0' + currentDate.getMonth() : currentDate.getMonth(); // Be careful! January is 0 not 1
    const year = currentDate.getFullYear();
    const timestamp = currentDate.getTime();
    const hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
    const seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds();
    const LTime = hours + ':' + minutes + ':' + seconds;
    const dateString = date + '-' + month + '-' + year + ' ' + LTime;
    return dateString;
  }

  public GetProofOfStakeReward( height) {
   // this.rewardCal = 0;
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
  getMappedData(blockRowDataAll) {
    this.GetProofOfStakeReward(blockRowDataAll[0].height);
    let totalA =  0;
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

// TotalAmount data calculation
 getAmount(transaction) {
  let y: any [] = this.getTransVal(transaction);
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
}
