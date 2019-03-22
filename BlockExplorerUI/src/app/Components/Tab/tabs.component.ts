import {
  Component,
  ContentChildren,
  QueryList, Input,
  AfterContentInit,
} from '@angular/core';
import { TabAngComponent } from './tabs-angular.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tabs-m',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabAngComponent) tabs: QueryList<TabAngComponent>;
  constructor() {

  }
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabAngComponent) {
    // deactivate all tabs
    // tslint:disable-next-line:no-shadowed-variable
    this.tabs.toArray().forEach(tab => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
