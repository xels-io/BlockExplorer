import { Component, OnInit } from '@angular/core';
//import { ParticlesModule } from 'angular-particle';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  constructor() { }

  ngOnInit() {


  }

}
