import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  ngxSpinnerTimeout:any;
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show("aboutLoader")
    this.ngxSpinnerTimeout=setTimeout(() => {
      this.spinner.hide("aboutLoader");
    }, 420);
  }

  ngOnDestroy(){
    clearTimeout(this.ngxSpinnerTimeout);
  }

}
