

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


// import {NgxTabModule} from '../Components/Tab/ngx-tab/ngx-tab.module';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';;

import { GridService } from '../Services/Grid.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'angular-6-datatable';

import {BlockDetailModule} from '../Components/block-details/block-detail/block-detail.module';

import { HomeComponent } from '../Components/home/home.component';
import { TransactionGridComponent } from '../Components/TransactionGrid/TransactionGrid.component';
import { LiveDataComponent } from '../Components/LiveData/LiveData.component';
import { AddressGridComponent } from '../Components/AddressGrid/AddressGrid.component';

import { FaqComponent } from '../Components/faq/faq.component';
import { AboutComponent } from '../Components/about/about.component';
import { MarketComponent } from '../Components/market/market.component';
import { ChartComP } from '../Components/chart/chart.component';


import { WalletsComponent } from '../Components/wallets/wallets.component';

//import { ParticlesModule } from 'angular-particle';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import {ChartModule} from 'angular2-highcharts';
import { TransactionDetailComponent } from '../Components/transaction-detail/transaction-detail.component';
declare var require: any;

    export function highchartsFactory() {
      const hc = require('highcharts');
      return hc;
    }
const COM_ARRAY =
    [
      HomeComponent,
     // SearchComponent,
      AddressGridComponent ,
      TransactionGridComponent,
      LiveDataComponent,
      FaqComponent,
      AboutComponent,
      // TransactioncardComponent,
      MarketComponent,
      ChartComP,
      WalletsComponent,
     // TransactionDetailComponent
      // BlockpageComponent,
    ];

@NgModule({
  declarations: [
    COM_ARRAY
  ],
  imports: [
    //ParticlesModule,
    CommonModule,
    NgxDatatableModule,
    DataTableModule,
    BlockDetailModule,

    ChartModule
  ],
  exports: [
    COM_ARRAY,
    CommonModule,
    //ParticlesModule,
    NgxDatatableModule,
    DataTableModule,
    BlockDetailModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [GridService]
      };
  }
}
