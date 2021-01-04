import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ngxSpinnerTimeout:any;
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show("contactLoader")
    this.ngxSpinnerTimeout=setTimeout(() => {
      this.spinner.hide("contactLoader");
    }, 420);
  }

  ngOnDestroy(){
    clearTimeout(this.ngxSpinnerTimeout);
  }

}
