import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockDetailsComponent } from '../../block-details/block-details.component';
// import {TableModule} from '../../block-table/table/table.module';
import {BlockpageComponent} from '../../blockpage/blockpage.component';

import { TransactionDetailComponent } from '../../transaction-detail/transaction-detail.component';
import { TransactioncardComponent } from '../../transactioncard/transactioncard.component';
import { RouterModule, Routes } from '@angular/router';

import { GridService } from '../../../Services/Grid.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { RawComponent } from '../../raw/raw.component';
import {NgxSpinnerModule} from "ngx-spinner";
const routes: Routes = [

  { path: 'blocks/:blockid', component: BlockDetailsComponent },

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [BlockDetailsComponent,  BlockpageComponent, TransactioncardComponent, TransactionDetailComponent,RawComponent],
  exports: [ BlockDetailsComponent, BlockpageComponent, TransactioncardComponent,TransactionDetailComponent, RouterModule],
 // providers: [GridService]

})
export class BlockDetailModule { }
