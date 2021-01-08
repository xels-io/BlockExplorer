

import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// import {NgxTabModule} from '../Components/Tab/ngx-tab/ngx-tab.module';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';;

import { GridService } from '../Services/Grid.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'angular-6-datatable';

import {BlockDetailModule} from '../Components/block-details/block-detail/block-detail.module';

import { HomeComponent } from '../Components/home/home.component';
import { LiveDataComponent } from '../Components/LiveData/LiveData.component';

import { AboutComponent } from '../Components/about/about.component';
 import { FormsModule } from '@angular/forms';
 import {NgxSpinnerModule} from "ngx-spinner";
 import {MatTooltipModule} from '@angular/material/tooltip';
 import {MatSnackBarModule} from '@angular/material/snack-bar';


import { TransactionDetailComponent } from '../Components/transaction-detail/transaction-detail.component';
declare var require: any;

    export function highchartsFactory() {
      const hc = require('highcharts');
      return hc;
    }
const COM_ARRAY =
    [
      HomeComponent,
      LiveDataComponent,
      AboutComponent,
    ];

@NgModule({
  declarations: [
    COM_ARRAY
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    DataTableModule,
    BlockDetailModule,
    FormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    COM_ARRAY,
    CommonModule,
    NgxDatatableModule,
    DataTableModule,
    BlockDetailModule,
    FormsModule,
    MatTooltipModule

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [

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
