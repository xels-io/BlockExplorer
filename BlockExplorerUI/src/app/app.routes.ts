import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './Components/home/home.component';

import { FaqComponent } from './Components/faq/faq.component';
import { AboutComponent } from './Components/about/about.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { TransactionDetailComponent } from './Components/transaction-detail/transaction-detail.component';
import { ContactComponent } from './Components/contact/contact.component';

 const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent},
    { path: 'transactions', component: TransactionsComponent },
    // { path: 'faq', component: FaqComponent },
    { path: 'about', component: AboutComponent },
    // { path: 'faq', component: FaqComponent },
   { path: 'contact', component: ContactComponent },
    { path: 'transaction/:address', component: TransactionDetailComponent },
    // { path: 'blocks/:height', component: BlockDetailsComponent, children: [
    //   { path: ':/address', component: TransactionDetailComponent }
    // ]},
   // { path: 'blocks/:height/:address',  loadChildren: './Components/block-details/block-detail/block-detail.module#BlockDetailModule'},
    { path: 'blocks/:height', loadChildren: './Components/block-details/block-detail/block-detail.module#BlockDetailModule'  },
  ];
  export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
