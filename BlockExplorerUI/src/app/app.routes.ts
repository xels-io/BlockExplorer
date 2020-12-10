import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './Components/home/home.component';

import { AboutComponent } from './Components/about/about.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { TransactionDetailComponent } from './Components/transaction-detail/transaction-detail.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddressAmountComponent } from './Components/address-amount/address-amount.component';
import { RichAddressComponent } from './Components/rich-address/rich-address.component';
import { BlockDetailsComponent } from './Components/block-details/block-details.component';

 const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent},
    { path: 'transactions', component: TransactionsComponent },
    { path: 'richAddress', component: RichAddressComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'transaction/:address', component: TransactionDetailComponent },
    { path: 'transaction/:txId', component: AddressAmountComponent },

  ];
  export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
