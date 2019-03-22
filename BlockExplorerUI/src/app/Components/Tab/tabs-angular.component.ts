import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-tab',
  styles: [
    `
    .pane{
      padding: 1em;
    }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
    <ng-content></ng-content>

    </div>
  `
})
export class  TabAngComponent {
  @Input() tabTitle: string;
  @Input() active = false;

}

