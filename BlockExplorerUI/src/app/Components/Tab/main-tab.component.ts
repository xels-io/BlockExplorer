import {  Component, ViewChild,
    OnInit} from '@angular/core';
  import { ComponentFactoryResolver } from '@angular/core';
import {TabsComponent} from './tabs.component';
@Component({
    selector: 'app-main-tabs',
    templateUrl: './main-tab.component.html',
    styleUrls: []
  })
export class MainTabComponent implements OnInit  {

  // @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder;
    constructor() {

    }

    ngOnInit() {

    }
}
