import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  ngxSpinnerTimeout:any;
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show("notFoundLoader")
    this.ngxSpinnerTimeout=setTimeout(() => {
      this.spinner.hide("notFoundLoader");
    }, 1550);
  }

  ngOnDestroy(){
    clearTimeout(this.ngxSpinnerTimeout);
  }

}
