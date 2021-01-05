// Import common module
// import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import modules from app
import { routingModule } from './app.routes';

// import Component
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

// import Service from app
import { GridService } from './Services/Grid.service';
import { FooterComponent } from './Components/Footer/footer.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddressAmountComponent } from './Components/address-amount/address-amount.component';
// import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

import {MatDialogModule} from '@angular/material/dialog';
import { RichAddressComponent } from './Components/rich-address/rich-address.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      FooterComponent,
      TransactionsComponent,
      ContactComponent,
      AddressAmountComponent,
      RichAddressComponent,
      NotFoundComponent,
   ],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
   imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    routingModule,
    MatDialogModule,
    NgxSpinnerModule,
    SharedModule.forRoot(),

   ],
   providers: [GridService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
