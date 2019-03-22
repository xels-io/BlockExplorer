import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

import {MatCardModule} from '@angular/material/card';

import { TabAngComponent } from '../tabs-angular.component';
import { TabsComponent } from '../tabs.component';
import { MainTabComponent } from '../main-tab.component';

// import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { RouterModule, Routes } from '@angular/router';

import { ExtractionComponent } from '../../extraction/extraction.component';
// import { ChartComP } from '../../chart/chart.component';



const routes: Routes = [

  // { path: 'coin', component: MainTabComponent, children: [
  //       {
  //         path: 'Blocks',
  //         component: ChartComP
  //       },
  //       {
  //         path: 'List',
  //         component: RichlistComponent
  //       }
  //     ]
  // },

];
@NgModule({
  imports: [
     CommonModule,

    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    RouterModule.forChild(routes),
   // Chart
  ],
  declarations: [
    // ChartCom,
    TabAngComponent,
    TabsComponent,
    MainTabComponent,

    ExtractionComponent,
    ],
  exports: [
    // ChartCom,
    TabAngComponent,
    TabsComponent,
    MainTabComponent,
    ExtractionComponent,
    // ChartComP,
    RouterModule
  ]
})
export class NgxTabModule {
 }

